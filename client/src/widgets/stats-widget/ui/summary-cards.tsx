import { Skeleton } from '@mui/material';
import type { StatsSummary } from '@/entities/stats';
import { PERIOD_LABEL } from '../model';
import styles from './stats-widget.module.scss';

interface SummaryCardsProps {
  summary: StatsSummary | undefined;
  period: keyof typeof PERIOD_LABEL;
  isLoading: boolean;
}

export const SummaryCards = ({ summary, period, isLoading }: SummaryCardsProps) => {
  return (
    <div className={styles.stats__cards}>
      <div className={styles.stats__card}>
        <div className={styles.stats__cardTitle}>Всего проверено объявлений</div>
        {isLoading || !summary ? (
          <Skeleton width={80} height={28} />
        ) : (
          <>
            <div className={styles.stats__cardValue}>
              {summary.totalReviewed.toLocaleString('ru-RU')}
            </div>
            <div className={styles.stats__cardHint}>
              Сегодня: {summary.totalReviewedToday} · Неделя: {summary.totalReviewedThisWeek} ·
              Месяц: {summary.totalReviewedThisMonth}
            </div>
          </>
        )}
      </div>

      <div className={styles.stats__card}>
        <div className={styles.stats__cardTitle}>
          Процент одобренных ({PERIOD_LABEL[period].toLowerCase()})
        </div>
        {isLoading || !summary ? (
          <Skeleton width={60} height={28} />
        ) : (
          <div className={styles.stats__cardValue}>{summary.approvedPercentage.toFixed(1)}%</div>
        )}
      </div>

      <div className={styles.stats__card}>
        <div className={styles.stats__cardTitle}>
          Процент отклоненных ({PERIOD_LABEL[period].toLowerCase()})
        </div>
        {isLoading || !summary ? (
          <Skeleton width={60} height={28} />
        ) : (
          <div className={styles.stats__cardValue}>{summary.rejectedPercentage.toFixed(1)}%</div>
        )}
      </div>

      <div className={styles.stats__card}>
        <div className={styles.stats__cardTitle}>Среднее время проверки</div>
        {isLoading || !summary ? (
          <Skeleton width={90} height={28} />
        ) : (
          <div className={styles.stats__cardValue}>
            {summary.averageReviewTime < 60
              ? `${summary.averageReviewTime} с`
              : `${Math.round(summary.averageReviewTime / 60)} мин`}
          </div>
        )}
      </div>
    </div>
  );
};
