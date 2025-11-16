import type { AdStatus, AdsListParams } from '@/entities/ad';

export type SortBy = NonNullable<AdsListParams['sortBy']>;
export type SortOrder = NonNullable<AdsListParams['sortOrder']>;

export interface AdsFilters {
  status: AdStatus[];
  categoryId: number | null;
  minPrice: number | null;
  maxPrice: number | null;
  search: string;
  sortBy: SortBy;
  sortOrder: SortOrder;
}

export interface CategoryOption {
  id: number;
  label: string;
}

export interface AdFiltersProps {
  filters: AdsFilters;
  onChange: (patch: Partial<AdsFilters>) => void;
  onReset: () => void;
  totalItems?: number;
  categories?: CategoryOption[];
  searchInputRef?: React.RefObject<HTMLInputElement | null>;
}

export interface AdFiltersProps {
  filters: AdsFilters;
  onChange: (patch: Partial<AdsFilters>) => void;
  onReset: () => void;
  totalItems?: number;
  categories?: CategoryOption[];
}
