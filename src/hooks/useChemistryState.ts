import { useState, useMemo, useEffect } from 'react';
import { COMPREHENSIVE_ELEMENTS } from '../data/elementsComprehensive';
import { COMPREHENSIVE_REACTIONS } from '../data/reactionsComprehensive';
import { COMPREHENSIVE_MOLECULES } from '../data/moleculesComprehensive';
import { ComprehensiveElement, ComprehensiveReaction, ComprehensiveMolecule } from '../types/comprehensiveChemistry';

export function usePeriodicTableFilter() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBlock, setSelectedBlock] = useState<'all' | 's' | 'p' | 'd' | 'f'>('all');
  const [selectedPeriod, setSelectedPeriod] = useState<number | 'all'>('all');

  const filteredElements = useMemo(() => {
    return COMPREHENSIVE_ELEMENTS.filter((el) => {
      const matchSearch =
        el.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        el.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        el.number.toString() === searchQuery.trim();
      const matchBlock = selectedBlock === 'all' || el.block === selectedBlock;
      const matchPeriod = selectedPeriod === 'all' || el.period === selectedPeriod;
      return matchSearch && matchBlock && matchPeriod;
    });
  }, [searchQuery, selectedBlock, selectedPeriod]);

  return {
    searchQuery,
    setSearchQuery,
    selectedBlock,
    setSelectedBlock,
    selectedPeriod,
    setSelectedPeriod,
    filteredElements,
    totalCount: COMPREHENSIVE_ELEMENTS.length
  };
}

export function useReactionSearch() {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const reactions = useMemo(() => {
    return COMPREHENSIVE_REACTIONS.filter((rxn) => {
      const matchCat = filterCategory === 'all' || rxn.category === filterCategory;
      const matchSearch =
        rxn.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rxn.balancedEquation.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [filterCategory, searchTerm]);

  return { filterCategory, setFilterCategory, searchTerm, setSearchTerm, reactions };
}

export function useMolecularExplorerState() {
  const [selectedMolId, setSelectedMolId] = useState<string>(COMPREHENSIVE_MOLECULES[0]?.id || '');
  const [renderMode, setRenderMode] = useState<'ball-stick' | 'space-filling' | 'wireframe'>('ball-stick');

  const activeMolecule = useMemo(() => {
    return COMPREHENSIVE_MOLECULES.find((m) => m.id === selectedMolId) || COMPREHENSIVE_MOLECULES[0];
  }, [selectedMolId]);

  return { selectedMolId, setSelectedMolId, renderMode, setRenderMode, activeMolecule, allMolecules: COMPREHENSIVE_MOLECULES };
}

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
