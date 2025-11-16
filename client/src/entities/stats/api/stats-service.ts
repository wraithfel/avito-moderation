import { api } from '@/shared/api';
import type {
  StatsPeriod,
  StatsSummary,
  ActivityPoint,
  DecisionsData,
  CategoriesData,
} from '../model/types';

const StatsApiService = {
  async getSummary(period: StatsPeriod, signal?: AbortSignal): Promise<StatsSummary> {
    const { data } = await api.get<StatsSummary>('/stats/summary', {
      params: { period },
      signal,
    });
    return data;
  },

  async getActivityChart(period: StatsPeriod, signal?: AbortSignal): Promise<ActivityPoint[]> {
    const { data } = await api.get<ActivityPoint[]>('/stats/chart/activity', {
      params: { period },
      signal,
    });
    return data;
  },

  async getDecisionsChart(period: StatsPeriod, signal?: AbortSignal): Promise<DecisionsData> {
    const { data } = await api.get<DecisionsData>('/stats/chart/decisions', {
      params: { period },
      signal,
    });
    return data;
  },

  async getCategoriesChart(period: StatsPeriod, signal?: AbortSignal): Promise<CategoriesData> {
    const { data } = await api.get<CategoriesData>('/stats/chart/categories', {
      params: { period },
      signal,
    });
    return data;
  },
};

export { StatsApiService };
