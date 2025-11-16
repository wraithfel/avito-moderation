import { useQuery } from '@tanstack/react-query';
import { statsQueries } from './stats-queries';
import type { StatsPeriod } from '../model/types';

export const useStatsSummary = (period: StatsPeriod) => {
  return useQuery(statsQueries.summary(period));
};

export const useActivityChart = (period: StatsPeriod) => {
  return useQuery(statsQueries.activity(period));
};

export const useDecisionsChart = (period: StatsPeriod) => {
  return useQuery(statsQueries.decisions(period));
};

export const useCategoriesChart = (period: StatsPeriod) => {
  return useQuery(statsQueries.categories(period));
};
