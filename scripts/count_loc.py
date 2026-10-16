#!/usr/bin/env python3
"""
Proton Pages — Reproducible Lines of Code (LOC) Accounting Script
Accurately categorizes and counts executable lines of code, comments, and blank lines
across first-party implementation, tests, datasets, documentation, configuration, and tooling.
"""

import os
import sys
import json
import argparse
from pathlib import Path

EXTENSION_ALLOWLIST = {
    ".ts": "TypeScript",
    ".tsx": "TypeScript (React)",
    ".js": "JavaScript",
    ".jsx": "JavaScript (React)",
    ".py": "Python",
    ".css": "CSS",
    ".html": "HTML",
    ".json": "JSON",
    ".md": "Markdown",
    ".toml": "TOML",
    ".yml": "YAML",
    ".yaml": "YAML",
    ".sql": "SQL",
    ".sh": "Shell",
    ".ps1": "PowerShell",
}

IGNORE_DIRS = {
    "node_modules",
    ".git",
    "dist",
    "dist-ssr",
    "build",
    ".pytest_cache",
    "__pycache__",
    ".vscode",
    ".idea",
    ".coverage",
}

IGNORE_FILES = {
    "package-lock.json",
    "pnpm-lock.yaml",
    "yarn.lock",
}

def is_ignored(path_obj: Path) -> bool:
    for part in path_obj.parts:
        if part in IGNORE_DIRS:
            return True
    if path_obj.name in IGNORE_FILES:
        return True
    if path_obj.suffix.lower() == ".pyc":
        return True
    return False

def categorize_file(rel_path_str: str) -> str:
    norm = rel_path_str.replace("\\", "/")
    
    # Tests
    if (
        norm.startswith("services/chemistry/tests/")
        or "/tests/" in norm
        or "/test/" in norm
        or norm.endswith(".test.ts")
        or norm.endswith(".test.tsx")
        or norm.endswith(".spec.ts")
        or norm.endswith(".spec.tsx")
        or norm.endswith("_test.py")
        or norm.startswith("tests/")
    ):
        return "Tests"

    # Reference Datasets
    if norm.startswith("src/data/"):
        return "Reference Datasets"

    # Frontend First-Party Implementation
    if norm.startswith("src/"):
        return "Frontend Implementation"

    # Database & Migrations
    if "alembic" in norm:
        return "Database & Migrations"

    # Backend First-Party Implementation
    if norm.startswith("services/chemistry/app/") or norm.startswith("services/"):
        if "tests" not in norm and "scripts" not in norm:
            return "Backend Implementation"

    # Documentation
    if norm.startswith("docs/") or norm.endswith(".md"):
        return "Documentation"

    # Generators & Scratch
    if norm.startswith("scratch/") or "scripts/" in norm:
        return "Generators & Scripts"

    # Configuration & Build
    if (
        norm.endswith(".json")
        or norm.endswith(".config.js")
        or norm.endswith(".config.ts")
        or norm.endswith(".toml")
        or norm.startswith(".github/")
        or norm in ["Dockerfile", "docker-compose.yml", "Makefile"]
    ):
        return "Config & Infrastructure"

    return "Other"

def analyze_file(filepath: Path):
    ext = filepath.suffix.lower()
    total_lines = 0
    blank_lines = 0
    comment_lines = 0
    code_lines = 0

    try:
        with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
            lines = f.readlines()
    except Exception:
        return None

    total_lines = len(lines)
    in_block_comment = False

    for line in lines:
        stripped = line.strip()
        if not stripped:
            blank_lines += 1
            continue

        if ext in [".ts", ".tsx", ".js", ".jsx", ".css"]:
            if in_block_comment:
                comment_lines += 1
                if "*/" in stripped:
                    in_block_comment = False
                continue
            if stripped.startswith("/*"):
                comment_lines += 1
                if "*/" not in stripped:
                    in_block_comment = True
                continue
            if stripped.startswith("//"):
                comment_lines += 1
                continue

        elif ext == ".py":
            if in_block_comment:
                comment_lines += 1
                if '"""' in stripped or "'''" in stripped:
                    in_block_comment = False
                continue
            if stripped.startswith('"""') or stripped.startswith("'''"):
                comment_lines += 1
                # If not closed on same line
                if (stripped.count('"""') % 2 != 0) or (stripped.count("'''") % 2 != 0):
                    in_block_comment = True
                continue
            if stripped.startswith("#"):
                comment_lines += 1
                continue

        elif ext in [".html"]:
            if in_block_comment:
                comment_lines += 1
                if "-->" in stripped:
                    in_block_comment = False
                continue
            if stripped.startswith("<!--"):
                comment_lines += 1
                if "-->" not in stripped:
                    in_block_comment = True
                continue

        code_lines += 1

    return {
        "total": total_lines,
        "blank": blank_lines,
        "comment": comment_lines,
        "code": code_lines,
    }

def main():
    parser = argparse.ArgumentParser(description="Proton Pages LOC Counter")
    parser.add_argument("--json", action="store_true", help="Output JSON format")
    parser.add_argument("--root", default=".", help="Workspace root directory")
    args = parser.parse_args()

    root_path = Path(args.root).resolve()
    categories = {}
    languages = {}
    file_records = []

    for path in root_path.rglob("*"):
        if not path.is_file():
            continue
        if is_ignored(path):
            continue
        ext = path.suffix.lower()
        if ext not in EXTENSION_ALLOWLIST:
            continue

        rel_path = path.relative_to(root_path)
        rel_str = str(rel_path)

        analysis = analyze_file(path)
        if not analysis:
            continue

        category = categorize_file(rel_str)
        lang = EXTENSION_ALLOWLIST[ext]

        if category not in categories:
            categories[category] = {"files": 0, "total": 0, "blank": 0, "comment": 0, "code": 0}
        categories[category]["files"] += 1
        categories[category]["total"] += analysis["total"]
        categories[category]["blank"] += analysis["blank"]
        categories[category]["comment"] += analysis["comment"]
        categories[category]["code"] += analysis["code"]

        if lang not in languages:
            languages[lang] = {"files": 0, "total": 0, "blank": 0, "comment": 0, "code": 0}
        languages[lang]["files"] += 1
        languages[lang]["total"] += analysis["total"]
        languages[lang]["blank"] += analysis["blank"]
        languages[lang]["comment"] += analysis["comment"]
        languages[lang]["code"] += analysis["code"]

        file_records.append({
            "path": rel_str,
            "category": category,
            "language": lang,
            **analysis
        })

    total_files = len(file_records)
    total_lines = sum(f["total"] for f in file_records)
    total_blank = sum(f["blank"] for f in file_records)
    total_comment = sum(f["comment"] for f in file_records)
    total_code = sum(f["code"] for f in file_records)

    first_party_code = (
        categories.get("Frontend Implementation", {}).get("code", 0)
        + categories.get("Backend Implementation", {}).get("code", 0)
    )

    data = {
        "summary": {
            "total_files": total_files,
            "total_lines": total_lines,
            "blank_lines": total_blank,
            "comment_lines": total_comment,
            "code_lines": total_code,
            "first_party_implementation_code": first_party_code,
            "tests_code": categories.get("Tests", {}).get("code", 0),
            "datasets_code": categories.get("Reference Datasets", {}).get("code", 0),
        },
        "by_category": categories,
        "by_language": languages,
    }

    if args.json:
        print(json.dumps(data, indent=2))
        return

    print("=" * 80)
    print("PROTON PAGES — VERIFIED CODEBASE METRICS (LOC)")
    print("=" * 80)
    print(f"{'Category':<28} | {'Files':>5} | {'Total':>7} | {'Blank':>6} | {'Comment':>7} | {'Code':>7}")
    print("-" * 80)
    for cat, stats in sorted(categories.items()):
        print(f"{cat:<28} | {stats['files']:>5} | {stats['total']:>7} | {stats['blank']:>6} | {stats['comment']:>7} | {stats['code']:>7}")
    print("-" * 80)
    print(f"{'TOTAL':<28} | {total_files:>5} | {total_lines:>7} | {total_blank:>6} | {total_comment:>7} | {total_code:>7}")
    print("=" * 80)
    print("\nBY PROGRAMMING LANGUAGE:")
    print("-" * 80)
    print(f"{'Language':<28} | {'Files':>5} | {'Total':>7} | {'Blank':>6} | {'Comment':>7} | {'Code':>7}")
    print("-" * 80)
    for lang, stats in sorted(languages.items(), key=lambda x: x[1]['code'], reverse=True):
        print(f"{lang:<28} | {stats['files']:>5} | {stats['total']:>7} | {stats['blank']:>6} | {stats['comment']:>7} | {stats['code']:>7}")
    print("-" * 80)
    print(f"\nTarget Focus:")
    print(f"  First-Party Implementation (Frontend + Backend): {first_party_code:,} code lines")
    print(f"  Independent Tests:                              {categories.get('Tests', {}).get('code', 0):,} code lines")
    print(f"  Reference Datasets & Dictionaries:             {categories.get('Reference Datasets', {}).get('code', 0):,} code lines")
    print(f"  Total Verified Non-Blank Source Lines:          {total_code:,} code lines")

if __name__ == "__main__":
    main()
