import { useQuery } from '@tanstack/react-query';
import { adQueries } from './ad-queries';

export const useGetAd = (id: number) => {
  return useQuery(adQueries.byId(id));
};
