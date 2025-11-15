import { api } from '@/shared/api';
import type {
  AdsListParams,
  AdsListResponse,
  Advertisement,
  ModerationPayload,
  ModerationResponse,
} from '../model/types';

const AdApiService = {
  async getAds(params: AdsListParams = {}): Promise<AdsListResponse> {
    const { data } = await api.get<AdsListResponse>('/ads', {
      params,
    });

    return data;
  },

  async getAdById(id: number): Promise<Advertisement> {
    const { data } = await api.get<Advertisement>(`/ads/${id}`);
    return data;
  },

  async approveAd(id: number): Promise<Advertisement> {
    const { data } = await api.post<ModerationResponse>(`/ads/${id}/approve`);
    return data.ad;
  },

  async rejectAd(id: number, payload: ModerationPayload): Promise<Advertisement> {
    const { data } = await api.post<ModerationResponse>(`/ads/${id}/reject`, payload);
    return data.ad;
  },

  async requestChanges(id: number, payload: ModerationPayload): Promise<Advertisement> {
    const { data } = await api.post<ModerationResponse>(`/ads/${id}/request-changes`, payload);
    return data.ad;
  },
};

export { AdApiService };
