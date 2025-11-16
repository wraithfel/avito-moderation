import { api } from '@/shared/api';
import type {
  AdsListParams,
  AdsListResponse,
  Advertisement,
  ModerationPayload,
  ModerationResponse,
} from '../model/types';

const AdApiService = {
  async getAds(params: AdsListParams = {}, signal?: AbortSignal): Promise<AdsListResponse> {
    const { data } = await api.get<AdsListResponse>('/ads', {
      params,
      signal,
    });
    return data;
  },

  async getAdById(id: number, signal?: AbortSignal): Promise<Advertisement> {
    const { data } = await api.get<Advertisement>(`/ads/${id}`, {
      signal,
    });
    return data;
  },

  async approveAd(id: number, signal?: AbortSignal): Promise<Advertisement> {
    const { data } = await api.post<ModerationResponse>(`/ads/${id}/approve`, undefined, {
      signal,
    });
    return data.ad;
  },

  async rejectAd(
    id: number,
    payload: ModerationPayload,
    signal?: AbortSignal,
  ): Promise<Advertisement> {
    const { data } = await api.post<ModerationResponse>(`/ads/${id}/reject`, payload, {
      signal,
    });
    return data.ad;
  },

  async requestChanges(
    id: number,
    payload: ModerationPayload,
    signal?: AbortSignal,
  ): Promise<Advertisement> {
    const { data } = await api.post<ModerationResponse>(`/ads/${id}/request-changes`, payload, {
      signal,
    });
    return data.ad;
  },
};

export { AdApiService };
