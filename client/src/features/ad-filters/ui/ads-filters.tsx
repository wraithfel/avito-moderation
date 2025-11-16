import {
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';

import type { AdStatus } from '@/entities/ad';
import type { AdFiltersProps } from '../model/types';
import {
  STATUS_OPTIONS,
  SORT_BY_OPTIONS,
  SORT_ORDER_OPTIONS,
  CATEGORY_OPTIONS,
} from '../model/constants';

import styles from './ad-filters.module.scss';

const AdFilters = ({ filters, onChange, onReset, totalItems, categories }: AdFiltersProps) => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ search: event.target.value });
  };

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const num = value === '' ? null : Number(value);
    onChange({ minPrice: Number.isNaN(num) ? null : num });
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const num = value === '' ? null : Number(value);
    onChange({ maxPrice: Number.isNaN(num) ? null : num });
  };

  const handleStatusToggle = (status: AdStatus) => {
    const current = filters.status ?? [];
    const isSelected = current.includes(status);
    const next = isSelected ? current.filter((s) => s !== status) : [...current, status];

    onChange({ status: next });
  };

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    if (!value) {
      onChange({ categoryId: null });
      return;
    }
    const id = Number(value);
    onChange({ categoryId: Number.isNaN(id) ? null : id });
  };

  const handleSortByChange = (event: SelectChangeEvent<string>) => {
    onChange({ sortBy: event.target.value as typeof filters.sortBy });
  };

  const handleSortOrderChange = (
    _: React.MouseEvent<HTMLElement>,
    value: typeof filters.sortOrder | null,
  ) => {
    if (!value) return;
    onChange({ sortOrder: value });
  };

  const activeFiltersCount =
    (filters.search ? 1 : 0) +
    (filters.status?.length ? 1 : 0) +
    (filters.categoryId !== null ? 1 : 0) +
    (filters.minPrice !== null ? 1 : 0) +
    (filters.maxPrice !== null ? 1 : 0);

  const categoryOptions = categories ?? CATEGORY_OPTIONS;

  return (
    <section className={styles.filters} aria-label='Фильтры объявлений'>
      <div className={styles.filters__row}>
        <TextField
          className={styles.filters__search}
          id='search'
          name='search'
          size='small'
          variant='outlined'
          label='Поиск по названию'
          placeholder='Например, iPhone 13'
          value={filters.search}
          onChange={handleSearchChange}
        />

        <div className={styles.filters__chips}>
          {STATUS_OPTIONS.map((option) => {
            const isSelected = filters.status?.includes(option.value) ?? false;
            return (
              <Chip
                key={option.value}
                label={option.label}
                size='small'
                clickable
                color={isSelected ? 'primary' : 'default'}
                variant={isSelected ? 'filled' : 'outlined'}
                onClick={() => handleStatusToggle(option.value)}
              />
            );
          })}
        </div>
      </div>

      <div className={styles.filters__row}>
        <div className={styles.filters__priceGroup}>
          <TextField
            id='price-min'
            name='priceMin'
            size='small'
            type='number'
            variant='outlined'
            label='Цена от'
            value={filters.minPrice ?? ''}
            onChange={handleMinPriceChange}
          />

          <TextField
            id='price-max'
            name='priceMax'
            size='small'
            type='number'
            variant='outlined'
            label='Цена до'
            value={filters.maxPrice ?? ''}
            onChange={handleMaxPriceChange}
          />
        </div>

        <FormControl size='small' sx={{ minWidth: 180 }}>
          <InputLabel id='category-label' htmlFor='category-select'>
            Категория
          </InputLabel>
          <Select
            id='category-select'
            name='categoryId'
            labelId='category-label'
            label='Категория'
            value={filters.categoryId !== null ? String(filters.categoryId) : ''}
            onChange={handleCategoryChange}
          >
            <MenuItem value=''>
              <em>Все категории</em>
            </MenuItem>
            {categoryOptions.map((category) => (
              <MenuItem key={category.id} value={String(category.id)}>
                {category.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size='small' sx={{ minWidth: 180 }}>
          <InputLabel id='sort-by-label' htmlFor='sort-by-select'>
            Сортировка
          </InputLabel>
          <Select
            id='sort-by-select'
            name='sortBy'
            labelId='sort-by-label'
            label='Сортировка'
            value={filters.sortBy}
            onChange={handleSortByChange}
          >
            {SORT_BY_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <ToggleButtonGroup
          size='small'
          exclusive
          value={filters.sortOrder}
          onChange={handleSortOrderChange}
        >
          {SORT_ORDER_OPTIONS.map((option) => (
            <ToggleButton key={option.value} value={option.value}>
              {option.value === 'asc' ? '↑' : '↓'}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        <div className={styles.filters__actions}>
          {typeof totalItems === 'number' && (
            <Typography variant='caption' color='text.secondary'>
              Найдено: {totalItems}
            </Typography>
          )}

          {activeFiltersCount > 0 && (
            <Typography variant='caption' color='text.secondary'>
              Активных фильтров: {activeFiltersCount}
            </Typography>
          )}

          <Button size='small' variant='text' onClick={onReset}>
            Сбросить фильтры
          </Button>
        </div>
      </div>
    </section>
  );
};

export { AdFilters };
