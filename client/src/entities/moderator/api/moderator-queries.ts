import { keepPreviousData, queryOptions } from '@tanstack/react-query';

import { ModeratorApiService } from './moderator-service';

export const moderatorQueries = {
  all: () => ['moderator'] as const,

  current: () =>
    queryOptions({
      queryKey: [...moderatorQueries.all(), 'current'],
      queryFn: ({ signal }) => ModeratorApiService.getCurrentModerator(signal),
      placeholderData: keepPreviousData,
      staleTime: 60 * 1000,
    }),
};
