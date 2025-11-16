import { CircularProgress, Typography } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import type { ActivityPoint } from '@/entities/stats';
import { DECISION_COLORS, PERIOD_LABEL } from '../model';
import styles from './stats-widget.module.scss';
import type { StatsPeriod } from '@/entities/stats';

interface ActivityChartCardProps {
  period: StatsPeriod;
  data: (ActivityPoint & { label: string })[];
  isLoading: boolean;
}

export const ActivityChartCard = ({ period, data, isLoading }: ActivityChartCardProps) => {
  return (
    <div className={styles.stats__chartCard}>
      <div className={styles.stats__chartTitle}>
        Активность по дням за {PERIOD_LABEL[period].toLowerCase()}
      </div>
      <div className={styles.stats__chartBody}>
        {isLoading ? (
          <CircularProgress size={24} />
        ) : data.length === 0 ? (
          <Typography variant='body2' color='text.secondary' className={styles.stats__chartEmpty}>
            Нет данных за выбранный период.
          </Typography>
        ) : (
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray='3 3' vertical={false} />
              <XAxis dataKey='label' />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey='approved' name='Одобрено' fill={DECISION_COLORS.approved} />
              <Bar dataKey='rejected' name='Отклонено' fill={DECISION_COLORS.rejected} />
              <Bar
                dataKey='requestChanges'
                name='На доработку'
                fill={DECISION_COLORS.requestChanges}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};
