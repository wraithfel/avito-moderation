import { api } from '@/shared/api';
import type { AdsListParams, AdsListResponse } from '../model/types';

const AdApiService = {
  async getAds(params: AdsListParams = {}): Promise<AdsListResponse> {
    const { data } = await api.get<AdsListResponse>('/ads', {
      params,
    });

    return data;
  },
};

export { AdApiService };
