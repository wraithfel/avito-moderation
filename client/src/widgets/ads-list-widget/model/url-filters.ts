import { DEFAULT_ADS_FILTERS, type AdsFilters } from '@/features/ad-filters';

const parseNumberParam = (raw: string | null): number | null => {
  if (!raw) return null;
  const num = Number(raw);
  return Number.isFinite(num) ? num : null;
};

const isValidSortBy = (value: string | null): value is AdsFilters['sortBy'] => {
  return value === 'createdAt' || value === 'price' || value === 'priority';
};

const isValidSortOrder = (value: string | null): value is AdsFilters['sortOrder'] => {
  return value === 'asc' || value === 'desc';
};

export const filtersFromSearchParams = (
  params: URLSearchParams,
): { filters: AdsFilters; page: number } => {
  const pageParam = parseNumberParam(params.get('page'));
  const page = pageParam && pageParam > 0 ? pageParam : 1;

  const statusParams = params.getAll('status').filter(Boolean);
  const categoryId = parseNumberParam(params.get('categoryId'));
  const minPrice = parseNumberParam(params.get('minPrice'));
  const maxPrice = parseNumberParam(params.get('maxPrice'));

  const search = params.get('search') ?? DEFAULT_ADS_FILTERS.search;

  const sortByParam = params.get('sortBy');
  const sortOrderParam = params.get('sortOrder');

  const sortBy = isValidSortBy(sortByParam) ? sortByParam : DEFAULT_ADS_FILTERS.sortBy;
  const sortOrder = isValidSortOrder(sortOrderParam)
    ? sortOrderParam
    : DEFAULT_ADS_FILTERS.sortOrder;

  const filters: AdsFilters = {
    status: statusParams.length ? (statusParams as AdsFilters['status']) : [],
    categoryId: categoryId ?? null,
    minPrice: minPrice ?? null,
    maxPrice: maxPrice ?? null,
    search,
    sortBy,
    sortOrder,
  };

  return { filters, page };
};

export const buildSearchParams = (filters: AdsFilters, page: number): URLSearchParams => {
  const params = new URLSearchParams();

  if (page > 1) {
    params.set('page', String(page));
  }

  if (filters.status.length) {
    filters.status.forEach((status) => {
      params.append('status', status);
    });
  }

  if (filters.categoryId !== null && filters.categoryId !== undefined) {
    params.set('categoryId', String(filters.categoryId));
  }

  if (filters.minPrice !== null && filters.minPrice !== undefined) {
    params.set('minPrice', String(filters.minPrice));
  }

  if (filters.maxPrice !== null && filters.maxPrice !== undefined) {
    params.set('maxPrice', String(filters.maxPrice));
  }

  if (filters.search.trim()) {
    params.set('search', filters.search.trim());
  }

  if (filters.sortBy !== DEFAULT_ADS_FILTERS.sortBy) {
    params.set('sortBy', filters.sortBy);
  }

  if (filters.sortOrder !== DEFAULT_ADS_FILTERS.sortOrder) {
    params.set('sortOrder', filters.sortOrder);
  }

  return params;
};
