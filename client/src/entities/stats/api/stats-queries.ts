import { keepPreviousData, queryOptions } from '@tanstack/react-query';
import { StatsApiService } from './stats-service';
import type { StatsPeriod } from '../model/types';

export const statsQueries = {
  all: () => ['stats'] as const,

  summary: (period: StatsPeriod) =>
    queryOptions({
      queryKey: [...statsQueries.all(), 'summary', period],
      queryFn: ({ signal }) => StatsApiService.getSummary(period, signal),
      placeholderData: keepPreviousData,
      staleTime: 60 * 1000,
    }),

  activity: (period: StatsPeriod) =>
    queryOptions({
      queryKey: [...statsQueries.all(), 'activity', period],
      queryFn: ({ signal }) => StatsApiService.getActivityChart(period, signal),
      placeholderData: keepPreviousData,
      staleTime: 60 * 1000,
    }),

  decisions: (period: StatsPeriod) =>
    queryOptions({
      queryKey: [...statsQueries.all(), 'decisions', period],
      queryFn: ({ signal }) => StatsApiService.getDecisionsChart(period, signal),
      placeholderData: keepPreviousData,
      staleTime: 60 * 1000,
    }),

  categories: (period: StatsPeriod) =>
    queryOptions({
      queryKey: [...statsQueries.all(), 'categories', period],
      queryFn: ({ signal }) => StatsApiService.getCategoriesChart(period, signal),
      placeholderData: keepPreviousData,
      staleTime: 60 * 1000,
    }),
};
