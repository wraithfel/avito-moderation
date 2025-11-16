import { useState } from 'react';
import { Alert, Typography } from '@mui/material';

import type { StatsPeriod } from '@/entities/stats';
import { useStatsWidget } from '../model';

import styles from './stats-widget.module.scss';
import { PeriodSwitch } from './period-switch';
import { SummaryCards } from './summary-cards';
import { ActivityChartCard } from './activity-chart-card';
import { DecisionsChartCard } from './decisions-chart-card';
import { CategoriesChartCard } from './categories-chart-card';

const StatsWidget = () => {
  const [period, setPeriod] = useState<StatsPeriod>('week');

  const {
    periodState: { summaryQuery, activityQuery, decisionsQuery, categoriesQuery },
    derived: { activityChartData, decisionsChartData, categoriesChartData, isLoading, hasError },
  } = useStatsWidget(period);

  return (
    <section className={styles.stats} aria-label='Статистика модератора'>
      <header className={styles.stats__header}>
        <div>
          <h1 className={styles.stats__title}>Статистика модератора</h1>
          <p className={styles.stats__subtitle}>
            Общие метрики и распределение решений за выбранный период.
          </p>
        </div>

        <PeriodSwitch period={period} onChange={setPeriod} />
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
