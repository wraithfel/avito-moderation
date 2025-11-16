import { api } from '@/shared/api';
import type {
  StatsPeriod,
  StatsSummary,
  ActivityPoint,
  DecisionsData,
  CategoriesData,
} from '../model/types';

const StatsApiService = {
  async getSummary(period: StatsPeriod): Promise<StatsSummary> {
    const { data } = await api.get<StatsSummary>('/stats/summary', {
      params: { period },
    });
    return data;
  },

  async getActivityChart(period: StatsPeriod): Promise<ActivityPoint[]> {
    const { data } = await api.get<ActivityPoint[]>('/stats/chart/activity', {
      params: { period },
    });
    return data;
  },

  async getDecisionsChart(period: StatsPeriod): Promise<DecisionsData> {
    const { data } = await api.get<DecisionsData>('/stats/chart/decisions', {
      params: { period },
    });
    return data;
  },

  async getCategoriesChart(period: StatsPeriod): Promise<CategoriesData> {
    const { data } = await api.get<CategoriesData>('/stats/chart/categories', {
      params: { period },
    });
    return data;
  },
};

export { StatsApiService };
