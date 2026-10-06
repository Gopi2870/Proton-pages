"""
Deterministic Tokenizer and Recursive Descent Parser for Chemical Formulas.
"""
from dataclasses import dataclass
from enum import Enum, auto
from typing import List, Dict, Optional, Tuple, Any
from services.chemistry.app.core.exceptions import InvalidFormulaError, UnknownElementError
from services.chemistry.app.models.formula import FormulaComposition
from services.chemistry.app.services.element_service import element_service


class TokenType(Enum):
    ELEMENT = auto()
    INTEGER = auto()
    FLOAT = auto()
    LPAREN = auto()
    RPAREN = auto()
    LBRACKET = auto()
    RBRACKET = auto()
    DOT = auto()
    PLUS = auto()
    MINUS = auto()
    EOF = auto()


@dataclass
class Token:
    type: TokenType
    value: Any
    position: int


class FormulaTokenizer:
    """
    Lexical analyzer for chemical formulas.
    """

    def __init__(self, formula: str):
        self.formula = formula.strip()
        self.pos = 0
        self.length = len(self.formula)

    def tokenize(self) -> List[Token]:
        tokens: List[Token] = []
        if not self.formula:
            raise InvalidFormulaError("", "Empty formula string")

        while self.pos < self.length:
            ch = self.formula[self.pos]

            if ch == " ":
                self.pos += 1
                continue

            start_pos = self.pos

            if ch in "([":
                tokens.append(Token(TokenType.LPAREN if ch == "(" else TokenType.LBRACKET, ch, start_pos))
                self.pos += 1
                continue
            elif ch in ")]":
                tokens.append(Token(TokenType.RPAREN if ch == ")" else TokenType.RBRACKET, ch, start_pos))
                self.pos += 1
                continue
            elif ch in ".·•":
                tokens.append(Token(TokenType.DOT, ".", start_pos))
                self.pos += 1
                continue
            elif ch == "+":
                tokens.append(Token(TokenType.PLUS, "+", start_pos))
                self.pos += 1
                continue
            elif ch == "-":
                tokens.append(Token(TokenType.MINUS, "-", start_pos))
                self.pos += 1
                continue

            # Digits: always tokenize integers
            if ch.isdigit():
                num_str = ""
                while self.pos < self.length and self.formula[self.pos].isdigit():
                    num_str += self.formula[self.pos]
                    self.pos += 1
                tokens.append(Token(TokenType.INTEGER, int(num_str), start_pos))
                continue

            # Uppercase Element Symbol (e.g., C, Ca, Uue)
            if ch.isupper():
                sym = ch
                self.pos += 1
                while self.pos < self.length and self.formula[self.pos].islower():
                    test_sym = sym + self.formula[self.pos]
                    sym = test_sym
                    self.pos += 1
                    if len(sym) == 2:
                        break

                tokens.append(Token(TokenType.ELEMENT, sym, start_pos))
                continue

            # Unexpected character or invalid lowercase without uppercase head
            if ch.islower():
                raise InvalidFormulaError(
                    self.formula,
                    f"Unexpected lowercase letter '{ch}' at position {self.pos}. Element symbols must start with uppercase."
                )

            raise InvalidFormulaError(self.formula, f"Unexpected character '{ch}' at position {self.pos}")

        tokens.append(Token(TokenType.EOF, None, self.pos))
        return tokens


# AST Node definitions
class ASTNode:
    def evaluate(self) -> Tuple[Dict[str, int], float]:
        raise NotImplementedError


class ElementNode(ASTNode):
    def __init__(self, symbol: str, count: int):
        self.symbol = symbol
        self.count = count

    def evaluate(self) -> Tuple[Dict[str, int], float]:
        return {self.symbol: self.count}, 0.0


class GroupNode(ASTNode):
    def __init__(self, children: List[ASTNode], multiplier: int):
        self.children = children
        self.multiplier = multiplier

    def evaluate(self) -> Tuple[Dict[str, int], float]:
        combined: Dict[str, int] = {}
        total_hydrate = 0.0
        for child in self.children:
            counts, hydrate = child.evaluate()
            total_hydrate += hydrate
            for elem, c in counts.items():
                combined[elem] = combined.get(elem, 0) + c * self.multiplier
        return combined, total_hydrate * self.multiplier


class HydrateNode(ASTNode):
    def __init__(self, water_molecules: float, water_group: ASTNode):
        self.water_molecules = water_molecules
        self.water_group = water_group

    def evaluate(self) -> Tuple[Dict[str, int], float]:
        counts, _ = self.water_group.evaluate()
        scaled: Dict[str, int] = {}
        for elem, c in counts.items():
            scaled[elem] = int(round(c * self.water_molecules))
        return scaled, self.water_molecules


class FormulaParser:
    """
    Recursive descent parser for chemical formulas.
    """

    def __init__(self, formula: str):
        self.formula = formula
        tokenizer = FormulaTokenizer(formula)
        self.tokens = tokenizer.tokenize()
        self.pos = 0

    def _current(self) -> Token:
        return self.tokens[self.pos]

    def _match(self, token_type: TokenType) -> bool:
        if self._current().type == token_type:
            self.pos += 1
            return True
        return False

    def _expect(self, token_type: TokenType, error_msg: str) -> Token:
        tok = self._current()
        if tok.type != token_type:
            raise InvalidFormulaError(self.formula, f"{error_msg} at position {tok.position}")
        self.pos += 1
        return tok

    def parse(self) -> FormulaComposition:
        if self._current().type == TokenType.EOF:
            raise InvalidFormulaError(self.formula, "Formula is empty")

        main_nodes: List[ASTNode] = []
        charge = 0

        # Check for invalid minus sign in subscript positions (e.g. C-2)
        for i in range(len(self.tokens) - 2):
            if (
                self.tokens[i].type == TokenType.ELEMENT
                and self.tokens[i + 1].type == TokenType.MINUS
                and self.tokens[i + 2].type == TokenType.INTEGER
            ):
                raise InvalidFormulaError(self.formula, "Negative subscripts are invalid in chemical formulas")

        # Parse terms
        main_nodes = self._parse_terms()

        # Check for hydrate (DOT followed by multiplier and formula)
        hydrate_water = 0.0
        while self._current().type == TokenType.DOT:
            self.pos += 1  # consume DOT
            water_multiplier = 1.0
            if self._current().type == TokenType.INTEGER:
                water_multiplier = float(self._current().value)
                self.pos += 1

            hydrate_terms = self._parse_terms()
            hydrate_group = GroupNode(hydrate_terms, 1)
            main_nodes.append(HydrateNode(water_multiplier, hydrate_group))
            hydrate_water += water_multiplier

        # Parse Charge notation if present at end
        if self._current().type in (TokenType.PLUS, TokenType.MINUS, TokenType.INTEGER):
            charge = self._parse_charge()

        if self._current().type != TokenType.EOF:
            tok = self._current()
            raise InvalidFormulaError(self.formula, f"Unexpected token '{tok.value}' at position {tok.position}")

        # Evaluate AST
        element_counts: Dict[str, int] = {}
        total_h_water = 0.0

        for node in main_nodes:
            counts, hyd = node.evaluate()
            total_h_water += hyd
            for elem, cnt in counts.items():
                element_counts[elem] = element_counts.get(elem, 0) + cnt

        if not element_counts:
            raise InvalidFormulaError(self.formula, "Formula contains no chemical elements")

        total_atoms = sum(element_counts.values())

        return FormulaComposition(
            elements=element_counts,
            total_atoms=total_atoms,
            charge=charge,
            hydrate_water_molecules=total_h_water
        )

    def _parse_terms(self) -> List[ASTNode]:
        nodes: List[ASTNode] = []
        while self._current().type in (TokenType.ELEMENT, TokenType.LPAREN, TokenType.LBRACKET):
            if self._current().type == TokenType.ELEMENT:
                elem_tok = self._current()
                symbol = elem_tok.value
                self.pos += 1

                element_service.get_element_by_symbol(symbol)

                multiplier = 1
                if self._current().type == TokenType.INTEGER:
                    multiplier = self._current().value
                    if multiplier <= 0:
                        raise InvalidFormulaError(self.formula, f"Subscript for '{symbol}' must be positive")
                    self.pos += 1

                nodes.append(ElementNode(symbol, multiplier))

            elif self._current().type in (TokenType.LPAREN, TokenType.LBRACKET):
                open_type = self._current().type
                close_type = TokenType.RPAREN if open_type == TokenType.LPAREN else TokenType.RBRACKET
                self.pos += 1

                group_nodes = self._parse_terms()
                if not group_nodes:
                    raise InvalidFormulaError(self.formula, "Empty parentheses/brackets '()' in formula")

                self._expect(close_type, "Unmatched opening parenthesis/bracket")

                multiplier = 1
                if self._current().type == TokenType.INTEGER:
                    multiplier = self._current().value
                    if multiplier <= 0:
                        raise InvalidFormulaError(self.formula, "Group multiplier must be positive")
                    self.pos += 1

                nodes.append(GroupNode(group_nodes, multiplier))

        return nodes

    def _parse_charge(self) -> int:
        tok = self._current()
        if tok.type in (TokenType.PLUS, TokenType.MINUS):
            sign = 1 if tok.type == TokenType.PLUS else -1
            self.pos += 1
            if self._current().type == TokenType.INTEGER:
                val = self._current().value
                self.pos += 1
                return sign * val
            return sign
        elif tok.type == TokenType.INTEGER:
            val = tok.value
            self.pos += 1
            if self._current().type in (TokenType.PLUS, TokenType.MINUS):
                sign = 1 if self._current().type == TokenType.PLUS else -1
                self.pos += 1
                return sign * val
            raise InvalidFormulaError(self.formula, f"Unexpected number {val} at charge position without +/- sign")
        return 0


def parse_formula(formula: str) -> FormulaComposition:
    parser = FormulaParser(formula)
    return parser.parse()
