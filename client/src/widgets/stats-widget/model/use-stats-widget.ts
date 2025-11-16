import { useMemo } from 'react';
import {
  useStatsSummary,
  useActivityChart,
  useDecisionsChart,
  useCategoriesChart,
  type StatsPeriod,
} from '@/entities/stats';

export const useStatsWidget = (period: StatsPeriod) => {
  const summaryQuery = useStatsSummary(period);
  const activityQuery = useActivityChart(period);
  const decisionsQuery = useDecisionsChart(period);
  const categoriesQuery = useCategoriesChart(period);

  const activityChartData = useMemo(
    () =>
      (activityQuery.data ?? []).map((point) => ({
        ...point,
        label: new Date(point.date).toLocaleDateString('ru-RU', {
          day: '2-digit',
          month: '2-digit',
        }),
      })),
    [activityQuery.data],
  );

  const decisionsChartData = useMemo(() => {
    if (!decisionsQuery.data) return [];
    const d = decisionsQuery.data;
    return [
      { name: 'Одобрено', key: 'approved', value: d.approved },
      { name: 'Отклонено', key: 'rejected', value: d.rejected },
      { name: 'На доработку', key: 'requestChanges', value: d.requestChanges },
    ];
  }, [decisionsQuery.data]);

  const categoriesChartData = useMemo(() => {
    const data = categoriesQuery.data;
    if (!data) return [];
    return Object.entries(data).map(([name, value]) => ({ name, value }));
  }, [categoriesQuery.data]);

  const isLoading =
    summaryQuery.isLoading ||
    activityQuery.isLoading ||
    decisionsQuery.isLoading ||
    categoriesQuery.isLoading;

  const hasError =
    summaryQuery.isError ||
    activityQuery.isError ||
    decisionsQuery.isError ||
    categoriesQuery.isError;

  return {
    periodState: {
      summaryQuery,
      activityQuery,
      decisionsQuery,
      categoriesQuery,
    },
    derived: {
      activityChartData,
      decisionsChartData,
      categoriesChartData,
      isLoading,
      hasError,
    },
  };
};
