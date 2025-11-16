import { useMemo, useState } from 'react';
import { Alert, Typography } from '@mui/material';

import type { StatsPeriod } from '@/entities/stats';
import { useStatsWidget, PERIOD_LABEL } from '../model';

import styles from './stats-widget.module.scss';
import { PeriodSwitch } from './period-switch';
import { SummaryCards } from './summary-cards';
import { ActivityChartCard } from './activity-chart-card';
import { DecisionsChartCard, type DecisionsItem } from './decisions-chart-card';
import { CategoriesChartCard } from './categories-chart-card';
import { StatsExportControls, type CsvRow } from '@/features/stats-export';

const StatsWidget = () => {
  const [period, setPeriod] = useState<StatsPeriod>('week');

  const {
    periodState: { summaryQuery, activityQuery, decisionsQuery, categoriesQuery },
    derived: { activityChartData, decisionsChartData, categoriesChartData, isLoading, hasError },
  } = useStatsWidget(period);

  const exportRows: CsvRow[] = useMemo(() => {
    const rows: CsvRow[] = [];
    const summary = summaryQuery.data;

    if (summary) {
      const section = `Сводка (${PERIOD_LABEL[period].toLowerCase()})`;
      rows.push(
        {
          Раздел: section,
          Метрика: 'Всего проверено объявлений',
          Значение: summary.totalReviewed,
          Дополнительно: '',
        },
        {
          Раздел: section,
          Метрика: 'Сегодня',
          Значение: summary.totalReviewedToday,
          Дополнительно: '',
        },
        {
          Раздел: section,
          Метрика: 'За неделю',
          Значение: summary.totalReviewedThisWeek,
          Дополнительно: '',
        },
        {
          Раздел: section,
          Метрика: 'За месяц',
          Значение: summary.totalReviewedThisMonth,
          Дополнительно: '',
        },
        {
          Раздел: section,
          Метрика: 'Одобрено, %',
          Значение: summary.approvedPercentage.toFixed(1),
          Дополнительно: '',
        },
        {
          Раздел: section,
          Метрика: 'Отклонено, %',
          Значение: summary.rejectedPercentage.toFixed(1),
          Дополнительно: '',
        },
        {
          Раздел: section,
          Метрика: 'На доработку, %',
          Значение: summary.requestChangesPercentage.toFixed(1),
          Дополнительно: '',
        },
        {
          Раздел: section,
          Метрика: 'Среднее время проверки, сек',
          Значение: summary.averageReviewTime,
          Дополнительно: '',
        },
      );
    }

    if (decisionsChartData.length) {
      decisionsChartData.forEach((item: DecisionsItem) => {
        rows.push({
          Раздел: 'Решения',
          Метрика: item.name,
          Значение: item.value,
          Дополнительно: 'распределение по решениям',
        });
      });
    }

    if (categoriesChartData.length) {
      categoriesChartData.forEach((item) => {
        rows.push({
          Раздел: 'Категории',
          Метрика: item.name,
          Значение: item.value,
          Дополнительно: 'проверено объявлений',
        });
      });
    }

    if (activityChartData.length) {
      activityChartData.forEach((point) => {
        rows.push({
          Раздел: 'Активность по дням',
          Метрика: point.label,
          Значение: point.approved + point.rejected + point.requestChanges,
          Дополнительно: `Одобрено: ${point.approved}; Отклонено: ${point.rejected}; На доработку: ${point.requestChanges}`,
        });
      });
    }

    return rows;
  }, [summaryQuery.data, decisionsChartData, categoriesChartData, activityChartData, period]);

  return (
    <section className={styles.stats} aria-label='Статистика модератора'>
      <header className={styles.stats__header}>
        <div>
          <h1 className={styles.stats__title}>Статистика модератора</h1>
          <p className={styles.stats__subtitle}>
            Общие метрики и распределение решений за выбранный период.
          </p>
        </div>

        <div className={styles.stats__headerControls}>
          <PeriodSwitch period={period} onChange={setPeriod} />
          <StatsExportControls
            rows={exportRows}
            filePrefix={`moderation-stats-${period}`}
            title={`Статистика модерации — ${PERIOD_LABEL[period]}`}
          />
        </div>
      </header>

      {hasError && (
        <Alert severity='error' variant='outlined'>
          Не удалось загрузить статистику. Попробуйте обновить страницу.
        </Alert>
      )}

      <SummaryCards
        summary={summaryQuery.data}
        period={period}
        isLoading={summaryQuery.isLoading}
      />

      <div className={styles.stats__chartsRow}>
        <ActivityChartCard
          period={period}
          data={activityChartData}
          isLoading={activityQuery.isLoading}
        />
        <DecisionsChartCard data={decisionsChartData} isLoading={decisionsQuery.isLoading} />
      </div>

      <CategoriesChartCard data={categoriesChartData} isLoading={categoriesQuery.isLoading} />

      {isLoading && !hasError && (
        <Typography variant='caption' color='text.secondary'>
          Обновление данных статистики…
        </Typography>
      )}
    </section>
  );
};

export { StatsWidget };
