import type { StatsPeriod } from '@/entities/stats';

export const DECISION_COLORS = {
  approved: 'rgb(var(--color-cyan))',
  rejected: 'rgb(var(--color-red))',
  requestChanges: 'rgb(var(--color-primary-yellow))',
};

export const PERIOD_LABEL: Record<StatsPeriod, string> = {
  today: 'Сегодня',
  week: 'Неделя',
  month: 'Месяц',
};
