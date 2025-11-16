import { keepPreviousData, queryOptions } from '@tanstack/react-query';

import { AdApiService } from './ad-service';
import type { AdsListParams } from '../model/types';

export const adQueries = {
  all: () => ['ads'] as const,

  list: (params: AdsListParams) =>
    queryOptions({
      queryKey: [...adQueries.all(), 'list', params],
      queryFn: ({ signal }) => AdApiService.getAds(params, signal),
      placeholderData: keepPreviousData,
      staleTime: 60 * 1000,
    }),

  byId: (id: number) =>
    queryOptions({
      queryKey: [...adQueries.all(), 'detail', id],
      queryFn: ({ signal }) => AdApiService.getAdById(id, signal),
      staleTime: 60 * 1000,
    }),
};
