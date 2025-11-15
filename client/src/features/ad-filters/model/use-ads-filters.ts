import { useState, useCallback } from 'react';
import type { AdStatus } from '@/entities/ad';
import type { AdsFilters } from './types';
import { DEFAULT_ADS_FILTERS } from './constants';

export const useAdsFilters = () => {
  const [filters, setFilters] = useState<AdsFilters>(DEFAULT_ADS_FILTERS);

  const setStatus = useCallback((status: AdStatus[]) => {
    setFilters((prev) => ({ ...prev, status }));
  }, []);

  const setCategoryId = useCallback((categoryId: number | null) => {
    setFilters((prev) => ({ ...prev, categoryId }));
  }, []);

  const setPriceRange = useCallback((minPrice: number | null, maxPrice: number | null) => {
    setFilters((prev) => ({ ...prev, minPrice, maxPrice }));
  }, []);

  const setSearch = useCallback((search: string) => {
    setFilters((prev) => ({ ...prev, search }));
  }, []);

  const setSort = useCallback(
    (sortBy: AdsFilters['sortBy'], sortOrder: AdsFilters['sortOrder']) => {
      setFilters((prev) => ({ ...prev, sortBy, sortOrder }));
    },
    [],
  );

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_ADS_FILTERS);
  }, []);

  const replaceFilters = useCallback((next: AdsFilters) => {
    setFilters(next);
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
