import { CircularProgress, Typography } from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  type PieLabelRenderProps,
} from 'recharts';

import { DECISION_COLORS } from '../model';
import styles from './stats-widget.module.scss';

export interface DecisionsItem {
  name: string;
  key: string;
  value: number;
  // для совместимости с ChartDataInput в Recharts
  [k: string]: string | number;
}

interface DecisionsChartCardProps {
  data: DecisionsItem[];
  isLoading: boolean;
}

export const DecisionsChartCard = ({ data, isLoading }: DecisionsChartCardProps) => {
  return (
    <div className={styles.stats__chartCard}>
      <div className={styles.stats__chartTitle}>Распределение решений</div>
      <div className={styles.stats__chartBody}>
        {isLoading ? (
          <CircularProgress size={24} />
        ) : data.length === 0 ? (
          <Typography variant='body2' color='text.secondary' className={styles.stats__chartEmpty}>
            Нет данных за выбранный период.
          </Typography>
        ) : (
          <ResponsiveContainer width='100%' height='100%'>
            <PieChart>
              <Pie
                data={data}
                dataKey='value'
                nameKey='name'
                outerRadius='80%'
                label={(props: PieLabelRenderProps) => {
                  const name = props.name ?? '';
                  const value =
                    typeof props.value === 'number' ? props.value : Number(props.value ?? 0);

                  if (!name || Number.isNaN(value)) return '';
                  return `${name}: ${value.toFixed(1)}%`;
                }}
              >
                {data.map((entry) => (
                  <Cell
                    key={entry.key}
                    fill={
                      DECISION_COLORS[entry.key as keyof typeof DECISION_COLORS] ??
                      'rgb(81, 190, 207)'
                    }
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value: number | string) => `${Number(value).toFixed(1)} %`} />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};
