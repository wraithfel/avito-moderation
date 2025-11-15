import { Chip, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

import styles from './ad-card.module.scss';
import { statusColor, statusLabel } from './constants';
import type { AdCardProps } from './types';
import { formatCurrency, formatDateTime } from '@/shared/utils';

const AdCard = ({ ad }: AdCardProps) => {
  return (
    <Paper className={styles.card} component={Link} to={`/item/${ad.id}`}>
      <div className={styles.card__main}>
        <div className={styles.card__titleRow}>
          <span className={styles.card__title}>{ad.title}</span>
          <Chip
            size='small'
            label={statusLabel[ad.status]}
            color={statusColor[ad.status]}
            variant='outlined'
          />
          {ad.priority === 'urgent' && (
            <Chip size='small' label='Срочно' color='error' variant='filled' />
          )}
        </div>

        <div className={styles.card__meta}>
          <span>{ad.category}</span>
          <span>Создано: {formatDateTime(ad.createdAt)}</span>
          <span>ID: {ad.id}</span>
        </div>

        <p className={styles.card__description}>{ad.description}</p>
      </div>

      <div className={styles.card__side}>
        <span className={styles.card__price}>{formatCurrency(ad.price)}</span>
        <span className={styles.card__seller}>{ad.seller.name}</span>
      </div>
    </Paper>
  );
};

export { AdCard };
