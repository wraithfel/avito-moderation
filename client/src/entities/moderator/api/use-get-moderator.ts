import { useQuery } from '@tanstack/react-query';

import { moderatorQueries } from './moderator-queries';

export const useGetCurrentModerator = () => {
  return useQuery(moderatorQueries.current());
};
