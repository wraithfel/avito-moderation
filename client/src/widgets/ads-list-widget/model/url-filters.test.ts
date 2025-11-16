import { describe, it, expect } from 'vitest';
import { filtersFromSearchParams, buildSearchParams } from './url-filters';
import { DEFAULT_ADS_FILTERS } from '@/features/ad-filters';
import type { AdsFilters } from '@/features/ad-filters';
import type { AdStatus } from '@/entities/ad';

describe('filtersFromSearchParams', () => {
  it('parses filters and page from search params', () => {
    const params = new URLSearchParams();
    params.set('page', '2');
    params.append('status', 'pending');
    params.append('status', 'approved');
    params.set('categoryId', '3');
    params.set('minPrice', '1000');
    params.set('maxPrice', '5000');
    params.set('search', 'iphone');
    params.set('sortBy', 'price');
    params.set('sortOrder', 'asc');

    const { filters, page } = filtersFromSearchParams(params);

    expect(page).toBe(2);
    expect(filters.status).toEqual(['pending', 'approved']);
    expect(filters.categoryId).toBe(3);
    expect(filters.minPrice).toBe(1000);
    expect(filters.maxPrice).toBe(5000);
    expect(filters.search).toBe('iphone');
    expect(filters.sortBy).toBe('price');
    expect(filters.sortOrder).toBe('asc');
  });

  it('falls back to defaults for invalid values', () => {
    const params = new URLSearchParams();
    params.set('page', '-1');
    params.set('sortBy', 'unknown');
    params.set('sortOrder', 'unknown');

    const { filters, page } = filtersFromSearchParams(params);

    expect(page).toBe(1);
    expect(filters.sortBy).toBe(DEFAULT_ADS_FILTERS.sortBy);
    expect(filters.sortOrder).toBe(DEFAULT_ADS_FILTERS.sortOrder);
  });
});

describe('buildSearchParams', () => {
  it('builds params from filters and page', () => {
    const filters: AdsFilters = {
      ...DEFAULT_ADS_FILTERS,
      status: ['pending'] as AdStatus[],
      categoryId: 4,
      minPrice: 100,
      maxPrice: 200,
      search: 'test',
      sortBy: 'price',
      sortOrder: 'asc',
    };

    const params = buildSearchParams(filters, 2);

    expect(params.get('page')).toBe('2');
    expect(params.getAll('status')).toEqual(['pending']);
    expect(params.get('categoryId')).toBe('4');
    expect(params.get('minPrice')).toBe('100');
    expect(params.get('maxPrice')).toBe('200');
    expect(params.get('search')).toBe('test');
    expect(params.get('sortBy')).toBe('price');
    expect(params.get('sortOrder')).toBe('asc');
  });

  it('omits defaults and empty values', () => {
    const params = buildSearchParams(DEFAULT_ADS_FILTERS, 1);

    expect(params.get('page')).toBeNull();
    expect(params.get('sortBy')).toBeNull();
    expect(params.get('sortOrder')).toBeNull();
    expect(params.get('search')).toBeNull();
  });
});
