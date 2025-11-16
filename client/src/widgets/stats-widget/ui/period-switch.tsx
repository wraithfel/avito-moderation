import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import type { StatsPeriod } from '@/entities/stats';
import styles from './stats-widget.module.scss';

interface PeriodSwitchProps {
  period: StatsPeriod;
  onChange: (period: StatsPeriod) => void;
}

export const PeriodSwitch = ({ period, onChange }: PeriodSwitchProps) => {
  const handleChange = (_: React.MouseEvent<HTMLElement>, value: StatsPeriod | null) => {
    if (value) onChange(value);
  };

  return (
    <div className={styles.stats__controls}>
      <span className={styles.stats__periodLabel}>Период:</span>
      <ToggleButtonGroup size='small' exclusive value={period} onChange={handleChange}>
        <ToggleButton value='today'>Сегодня</ToggleButton>
        <ToggleButton value='week'>Неделя</ToggleButton>
        <ToggleButton value='month'>Месяц</ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};
