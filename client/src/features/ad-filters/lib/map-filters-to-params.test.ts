import { describe, it, expect } from 'vitest';
import type { AdsFilters } from '../model/types';
import { DEFAULT_ADS_FILTERS } from '../model/constants';
import { mapFiltersToParams } from './map-filters-to-params';

describe('mapFiltersToParams', () => {
  it('maps basic filters and pagination', () => {
    const filters: AdsFilters = {
      ...DEFAULT_ADS_FILTERS,
      search: 'iphone',
      minPrice: 1000,
      maxPrice: 5000,
      categoryId: 2,
      status: ['pending', 'approved'],
      sortBy: 'price',
      sortOrder: 'asc',
    };

    const params = mapFiltersToParams(filters, 3, 20);

    expect(params.page).toBe(3);
    expect(params.limit).toBe(20);
    expect(params.search).toBe('iphone');
    expect(params.minPrice).toBe(1000);
    expect(params.maxPrice).toBe(5000);
    expect(params.categoryId).toBe(2);
    expect(params.status).toEqual(['pending', 'approved']);
    expect(params.sortBy).toBe('price');
    expect(params.sortOrder).toBe('asc');
  });

  it('trims search and drops empty search', () => {
    const filters: AdsFilters = {
      ...DEFAULT_ADS_FILTERS,
      search: '   ',
    };

    const params = mapFiltersToParams(filters, 1, 10);
    expect(params.search).toBeUndefined();
  });
});
