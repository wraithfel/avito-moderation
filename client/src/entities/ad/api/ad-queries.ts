import { keepPreviousData, queryOptions } from '@tanstack/react-query';

import { AdApiService } from './ad-service';
import type { AdsListParams } from '../model/types';

export const adQueries = {
  all: () => ['ads'] as const,

  list: (params: AdsListParams) =>
    queryOptions({
      queryKey: [...adQueries.all(), 'list', params],
      queryFn: () => AdApiService.getAds(params),
      placeholderData: keepPreviousData,
      staleTime: 60 * 1000,
    }),
};
