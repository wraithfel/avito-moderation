import { useQuery } from '@tanstack/react-query';

import { adQueries } from './ad-queries';
import type { AdsListParams } from '../model/types';

export const useGetAds = (params: AdsListParams) => {
  return useQuery(adQueries.list(params));
};
