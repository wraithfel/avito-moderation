import { CircularProgress, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import styles from './stats-widget.module.scss';

interface CategoriesItem {
  name: string;
  value: number;
}

interface CategoriesChartCardProps {
  data: CategoriesItem[];
  isLoading: boolean;
}

export const CategoriesChartCard = ({ data, isLoading }: CategoriesChartCardProps) => {
  return (
    <div className={styles.stats__chartCard}>
      <div className={styles.stats__chartTitle}>Распределение по категориям</div>
      <div className={styles.stats__chartBody}>
        {isLoading ? (
          <CircularProgress size={24} />
        ) : data.length === 0 ? (
          <Typography variant='body2' color='text.secondary' className={styles.stats__chartEmpty}>
            Нет данных за выбранный период.
          </Typography>
        ) : (
          <ResponsiveContainer width='100%' height={240}>
            <BarChart
              data={data}
              layout='vertical'
              margin={{ left: 80, right: 16, top: 8, bottom: 8 }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis type='number' allowDecimals={false} />
              <YAxis type='category' dataKey='name' width={120} />
              <Tooltip />
              <Bar dataKey='value' name='Проверено' fill='rgb(81, 190, 207)' />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};
