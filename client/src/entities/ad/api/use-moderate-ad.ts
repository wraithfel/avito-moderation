import { useMutation, useQueryClient } from '@tanstack/react-query';

import { AdApiService } from './ad-service';
import { adQueries } from './ad-queries';
import type { Advertisement, ModerationPayload } from '../model/types';

const updateCachesAfterModeration = (
  queryClient: ReturnType<typeof useQueryClient>,
  id: number,
  updatedAd: Advertisement,
) => {
  const detailQuery = adQueries.byId(id);
  queryClient.setQueryData(detailQuery.queryKey, updatedAd);

  queryClient.invalidateQueries({ queryKey: adQueries.all() });
};

export const useApproveAd = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => AdApiService.approveAd(id),
    onSuccess: (updatedAd) => {
      updateCachesAfterModeration(queryClient, id, updatedAd);
    },
  });
};

export const useRejectAd = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ModerationPayload) => AdApiService.rejectAd(id, payload),
    onSuccess: (updatedAd) => {
      updateCachesAfterModeration(queryClient, id, updatedAd);
    },
  });
};

export const useRequestChanges = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ModerationPayload) => AdApiService.requestChanges(id, payload),
    onSuccess: (updatedAd) => {
      updateCachesAfterModeration(queryClient, id, updatedAd);
    },
  });
};
