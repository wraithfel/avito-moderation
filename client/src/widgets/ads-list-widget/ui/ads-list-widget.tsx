import { useEffect, useMemo, useRef, useState } from 'react';
import { Alert, Box, CircularProgress, Stack, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import { AdCard, adQueries, useGetAds } from '@/entities/ad';
import {
  AdFilters,
  useAdsFilters,
  mapFiltersToParams,
  type AdsFilters,
} from '@/features/ad-filters';
import { AdsPagination } from '@/features/ad-pagination';
import { useAdSelection, BulkSelectionBar } from '@/features/ad-selection';
import { api } from '@/shared/api';
import type { ModerationResponse, ModerationPayload } from '@/entities/ad';
import type { ModerationReason } from '@widgets/ad-detail-widget/model/types';

import { BulkRejectDialog } from './bulk-reject-dialog';
import { filtersFromSearchParams, buildSearchParams } from '../model/url-filters';

import styles from './ads-list-widget.module.scss';

const PAGE_LIMIT = 10;

const AdsListWidget = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialState = useMemo(
    () => filtersFromSearchParams(searchParams as unknown as URLSearchParams),
    [searchParams],
  );

  const [page, setPage] = useState(initialState.page);
  const { filters, setFilters, resetFilters } = useAdsFilters(initialState.filters as AdsFilters);

  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const queryClient = useQueryClient();
  const { selectedIds, setSelected, reset: resetSelection, isSelected } = useAdSelection();
  const [isBulkLoading, setIsBulkLoading] = useState(false);

  const [isBulkDialogOpen, setIsBulkDialogOpen] = useState(false);
  const [bulkReason, setBulkReason] = useState<ModerationReason>('Запрещенный товар');
  const [bulkComment, setBulkComment] = useState('');

  useEffect(() => {
    const params = buildSearchParams(filters, page);
    setSearchParams(params, { replace: true });
  }, [filters, page, setSearchParams]);

  const params = useMemo(() => mapFiltersToParams(filters, page, PAGE_LIMIT), [filters, page]);

  const { data, isLoading, isError, refetch, isFetching } = useGetAds(params);

  const totalItems = data?.pagination.totalItems ?? 0;
  const totalPages = data?.pagination.totalPages ?? 1;
  const ads = data?.ads ?? [];
  const itemsPerPage = data?.pagination.itemsPerPage ?? PAGE_LIMIT;

  const startItem = totalItems === 0 ? 0 : (page - 1) * itemsPerPage + 1;
  const endItem = totalItems === 0 ? 0 : Math.min(page * itemsPerPage, totalItems);

  const handleFiltersChange = (patch: Partial<AdsFilters>) => {
    setFilters({ ...filters, ...patch });
    setPage(1);
    resetSelection();
  };

  const handleReset = () => {
    resetFilters();
    setPage(1);
    resetSelection();
  };

  const activeFiltersCount =
    (filters.search ? 1 : 0) +
    (filters.status?.length ? 1 : 0) +
    (filters.categoryId !== null ? 1 : 0) +
    (filters.minPrice !== null ? 1 : 0) +
    (filters.maxPrice !== null ? 1 : 0);

  const handleBulkModeration = async (
    action: 'approve' | 'reject',
    payload?: ModerationPayload,
  ) => {
    if (selectedIds.length === 0) {
      return;
    }

    setIsBulkLoading(true);
    try {
      const endpoint = action === 'approve' ? 'approve' : 'reject';

      const results = await Promise.all(
        selectedIds.map(async (id) => {
          try {
            const body =
              action === 'reject'
                ? (payload ??
                  ({
                    reason: 'Другое',
                    comment: 'Массовое отклонение модератором',
                  } satisfies ModerationPayload))
                : undefined;

            const response = await api.post<ModerationResponse>(`/ads/${id}/${endpoint}`, body);
            const updatedAd = response.data.ad;

            const detailQuery = adQueries.byId(updatedAd.id);
            queryClient.setQueryData(detailQuery.queryKey, updatedAd);

            return updatedAd;
          } catch {
            return null;
          }
        }),
      );

      if (results.some((ad) => ad !== null)) {
        queryClient.invalidateQueries({ queryKey: adQueries.all() });
      }

      resetSelection();
    } finally {
      setIsBulkLoading(false);
    }
  };

  const handleBulkApprove = () => {
    void handleBulkModeration('approve');
  };

  const handleBulkReject = () => {
    if (selectedIds.length === 0) return;

    setBulkReason('Запрещенный товар');
    setBulkComment('');
    setIsBulkDialogOpen(true);
  };

  const handleBulkRejectConfirm = async () => {
    if (selectedIds.length === 0) {
      setIsBulkDialogOpen(false);
      return;
    }

    const payload: ModerationPayload = {
      reason: bulkReason,
      comment: bulkComment.trim() || undefined,
    };

    await handleBulkModeration('reject', payload);
    setIsBulkDialogOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const tagName = target?.tagName.toLowerCase();

      if (tagName === 'input' || tagName === 'textarea' || target?.isContentEditable) {
        return;
      }

      if (event.key === '/') {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

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
        searchInputRef={searchInputRef}
      />

      <BulkSelectionBar
        selectedCount={selectedIds.length}
        isProcessing={isBulkLoading || isFetching}
        onApproveSelected={handleBulkApprove}
        onRejectSelected={handleBulkReject}
        onClear={resetSelection}
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
                {ads.map((ad, index) => (
                  <AdCard
                    key={ad.id}
                    ad={ad}
                    selectable
                    selected={isSelected(ad.id)}
                    onSelectChange={(value) => setSelected(ad.id, value)}
                    style={{ animationDelay: `${index * 40}ms` }}
                  />
                ))}
              </Stack>
            </div>
          )}

          {totalPages > 1 && (
            <footer className={styles.list__footer}>
              <AdsPagination
                page={page}
                totalPages={totalPages}
                onChange={(nextPage) => {
                  setPage(nextPage);
                  resetSelection();
                }}
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

      <BulkRejectDialog
        open={isBulkDialogOpen}
        count={selectedIds.length}
        isLoading={isBulkLoading}
        reason={bulkReason}
        comment={bulkComment}
        onReasonChange={setBulkReason}
        onCommentChange={setBulkComment}
        onClose={() => setIsBulkDialogOpen(false)}
        onConfirm={() => void handleBulkRejectConfirm()}
      />
    </section>
  );
};

export { AdsListWidget };
