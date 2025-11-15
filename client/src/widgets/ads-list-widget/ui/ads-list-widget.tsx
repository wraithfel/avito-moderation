import { useMemo, useState } from 'react';
import { Alert, Box, CircularProgress, Stack, Typography } from '@mui/material';

import { useGetAds, AdCard } from '@/entities/ad';
import { AdFilters, useAdsFilters, mapFiltersToParams } from '@/features/ad-filters';
import { AdsPagination } from '@/features/ad-pagination';

import styles from './ads-list-widget.module.scss';

const PAGE_LIMIT = 10;

const AdsListWidget = () => {
  const [page, setPage] = useState(1);
  const { filters, setFilters, resetFilters } = useAdsFilters();

  const params = useMemo(() => mapFiltersToParams(filters, page, PAGE_LIMIT), [filters, page]);

  const { data, isLoading, isError, refetch, isFetching } = useGetAds(params);

  const totalItems = data?.pagination.totalItems ?? 0;
  const totalPages = data?.pagination.totalPages ?? 1;
  const ads = data?.ads ?? [];
  const itemsPerPage = data?.pagination.itemsPerPage ?? PAGE_LIMIT;

  const startItem = totalItems === 0 ? 0 : (page - 1) * itemsPerPage + 1;
  const endItem = totalItems === 0 ? 0 : Math.min(page * itemsPerPage, totalItems);

  const handleFiltersChange = (patch: Partial<typeof filters>) => {
    setFilters({ ...filters, ...patch });
    setPage(1);
  };

  const handleReset = () => {
    resetFilters();
    setPage(1);
  };

  const activeFiltersCount =
    (filters.search ? 1 : 0) +
    (filters.status?.length ? 1 : 0) +
    (filters.categoryId !== null ? 1 : 0) +
    (filters.minPrice !== null ? 1 : 0) +
    (filters.maxPrice !== null ? 1 : 0);

  return (
    <section className={styles.list} aria-label='Список объявлений'>
      <header className={styles.list__header}>
        <div>
          <h1 className={styles.list__title}>Объявления</h1>
          <p className={styles.list__subtitle}>
            Управляйте модерацией объявлений, используя фильтры и сортировку.
          </p>
        </div>

        {typeof totalItems === 'number' && !isLoading && (
          <Typography variant='body2' color='text.secondary'>
            Всего объявлений: {totalItems}
            {activeFiltersCount > 0 && ` · Активных фильтров: ${activeFiltersCount}`}
          </Typography>
        )}
      </header>

      <AdFilters
        filters={filters}
        onChange={handleFiltersChange}
        onReset={handleReset}
        totalItems={totalItems}
      />

      {isLoading && (
        <div className={styles.list__loader}>
          <CircularProgress size={28} />
        </div>
      )}

      {!isLoading && isError && (
        <div className={styles.list__error}>
          <Alert
            severity='error'
            variant='outlined'
            action={
              <Box component='button' onClick={() => refetch()}>
                Повторить
              </Box>
            }
          >
            Не удалось загрузить объявления. Попробуйте обновить страницу.
          </Alert>
        </div>
      )}

      {!isLoading && !isError && (
        <>
          {ads.length === 0 ? (
            <div className={styles.list__empty}>
              <Typography variant='body2'>
                Объявлений не найдено. Попробуйте изменить условия фильтрации.
              </Typography>
            </div>
          ) : (
            <div className={styles.list__body}>
              <Stack spacing={1}>
                {ads.map((ad) => (
                  <AdCard key={ad.id} ad={ad} />
                ))}
              </Stack>
            </div>
          )}

          {totalPages > 1 && (
            <footer className={styles.list__footer}>
              <AdsPagination
                page={page}
                totalPages={totalPages}
                onChange={(nextPage) => setPage(nextPage)}
              />

              {totalItems > 0 && (
                <Typography variant='caption' color='text.secondary' className={styles.list__range}>
                  Показаны {startItem}–{endItem} из {totalItems}
                </Typography>
              )}
            </footer>
          )}

          {isFetching && !isLoading && (
            <Typography variant='caption' color='text.secondary'>
              Обновление данных…
            </Typography>
          )}
        </>
      )}
    </section>
  );
};

export { AdsListWidget };
