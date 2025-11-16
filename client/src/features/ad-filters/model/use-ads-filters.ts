import { useState, useCallback } from 'react';
import type { AdStatus } from '@/entities/ad';
import type { AdsFilters } from './types';
import { DEFAULT_ADS_FILTERS } from './constants';

export const useAdsFilters = (initialFilters: AdsFilters = DEFAULT_ADS_FILTERS) => {
  const [filters, setFiltersState] = useState<AdsFilters>(initialFilters);

  const setStatus = useCallback((status: AdStatus[]) => {
    setFiltersState((prev) => ({ ...prev, status }));
  }, []);

  const setCategoryId = useCallback((categoryId: number | null) => {
    setFiltersState((prev) => ({ ...prev, categoryId }));
  }, []);

  const setPriceRange = useCallback((minPrice: number | null, maxPrice: number | null) => {
    setFiltersState((prev) => ({ ...prev, minPrice, maxPrice }));
  }, []);

  const setSearch = useCallback((search: string) => {
    setFiltersState((prev) => ({ ...prev, search }));
  }, []);

  const setSort = useCallback(
    (sortBy: AdsFilters['sortBy'], sortOrder: AdsFilters['sortOrder']) => {
      setFiltersState((prev) => ({ ...prev, sortBy, sortOrder }));
    },
    [],
  );

  const resetFilters = useCallback(() => {
    setFiltersState(DEFAULT_ADS_FILTERS);
  }, []);

  const replaceFilters = useCallback((next: AdsFilters) => {
    setFiltersState(next);
  }, []);

  return {
    filters,
    setStatus,
    setCategoryId,
    setPriceRange,
    setSearch,
    setSort,
    resetFilters,
    setFilters: replaceFilters,
  };
};
