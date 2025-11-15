import type { AdsListParams } from '@/entities/ad/model/types';
import type { AdsFilters } from '../model/types';

export const mapFiltersToParams = (
  filters: AdsFilters,
  page: number,
  limit: number,
): AdsListParams => {
  const params: AdsListParams = {
    page,
    limit,
    sortBy: filters.sortBy,
    sortOrder: filters.sortOrder,
  };

  if (filters.status.length) {
    params.status = filters.status;
  }

  if (filters.categoryId !== null && filters.categoryId !== undefined) {
    params.categoryId = filters.categoryId;
  }

  if (filters.minPrice !== null && filters.minPrice !== undefined) {
    params.minPrice = filters.minPrice;
  }

  if (filters.maxPrice !== null && filters.maxPrice !== undefined) {
    params.maxPrice = filters.maxPrice;
  }

  const trimmedSearch = filters.search.trim();
  if (trimmedSearch) {
    params.search = trimmedSearch;
  }

  return params;
};
