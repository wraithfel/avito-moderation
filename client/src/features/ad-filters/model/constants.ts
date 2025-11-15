import type { AdStatus } from '@/entities/ad';
import type { AdsFilters, SortBy, SortOrder, CategoryOption } from './types';

export const DEFAULT_ADS_FILTERS: AdsFilters = {
  status: [],
  categoryId: null,
  minPrice: null,
  maxPrice: null,
  search: '',
  sortBy: 'createdAt',
  sortOrder: 'desc',
};

export const STATUS_OPTIONS: { value: AdStatus; label: string }[] = [
  { value: 'pending', label: 'На модерации' },
  { value: 'approved', label: 'Одобрено' },
  { value: 'rejected', label: 'Отклонено' },
  { value: 'draft', label: 'Черновик' },
];

export const SORT_BY_OPTIONS: { value: SortBy; label: string }[] = [
  { value: 'createdAt', label: 'Дата создания' },
  { value: 'price', label: 'Цена' },
  { value: 'priority', label: 'Приоритет' },
];

export const SORT_ORDER_OPTIONS: { value: SortOrder; label: string }[] = [
  { value: 'desc', label: 'По убыванию' },
  { value: 'asc', label: 'По возрастанию' },
];

export const CATEGORY_OPTIONS: CategoryOption[] = [
  { id: 0, label: 'Электроника' },
  { id: 1, label: 'Недвижимость' },
  { id: 2, label: 'Транспорт' },
  { id: 3, label: 'Работа' },
  { id: 4, label: 'Услуги' },
  { id: 5, label: 'Животные' },
  { id: 6, label: 'Мода' },
  { id: 7, label: 'Детское' },
];
