import { api } from '@/shared/api';
import type { Moderator } from '../model/types';

const ModeratorApiService = {
  async getCurrentModerator(): Promise<Moderator> {
    const { data } = await api.get<Moderator>('/moderators/me');

    return data;
  },
};

export { ModeratorApiService };
