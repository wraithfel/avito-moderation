import { api } from '@/shared/api';
import type { Moderator } from '../model/types';

const ModeratorApiService = {
  async getCurrentModerator(signal?: AbortSignal): Promise<Moderator> {
    const { data } = await api.get<Moderator>('/moderators/me', {
      signal,
    });
    return data;
  },
};

export { ModeratorApiService };
