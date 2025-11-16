import { keepPreviousData, queryOptions } from '@tanstack/react-query';
import { StatsApiService } from './stats-service';
import type { StatsPeriod } from '../model/types';

export const statsQueries = {
  all: () => ['stats'] as const,

  summary: (period: StatsPeriod) =>
    queryOptions({
      queryKey: [...statsQueries.all(), 'summary', period],
      queryFn: () => StatsApiService.getSummary(period),
      placeholderData: keepPreviousData,
      staleTime: 60 * 1000,
    }),

  activity: (period: StatsPeriod) =>
    queryOptions({
      queryKey: [...statsQueries.all(), 'activity', period],
      queryFn: () => StatsApiService.getActivityChart(period),
      placeholderData: keepPreviousData,
      staleTime: 60 * 1000,
    }),

  decisions: (period: StatsPeriod) =>
    queryOptions({
      queryKey: [...statsQueries.all(), 'decisions', period],
      queryFn: () => StatsApiService.getDecisionsChart(period),
      placeholderData: keepPreviousData,
      staleTime: 60 * 1000,
    }),

  categories: (period: StatsPeriod) =>
    queryOptions({
      queryKey: [...statsQueries.all(), 'categories', period],
      queryFn: () => StatsApiService.getCategoriesChart(period),
      placeholderData: keepPreviousData,
      staleTime: 60 * 1000,
    }),
};
