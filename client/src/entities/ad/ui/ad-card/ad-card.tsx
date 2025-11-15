import { Chip, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

import styles from './ad-card.module.scss';
import { statusColor, statusLabel } from './constants';
import type { AdCardProps } from './types';
import { formatCurrency, formatDateTime } from '@/shared/utils';

const AdCard = ({ ad }: AdCardProps) => {
  const thumbnail =
    ad.images?.[0] ??
    `https://placehold.co/160x120/2b2b2b/8f8f8f?text=${encodeURIComponent(ad.category)}`;

  return (
    <Paper className={styles.card} component={Link} to={`/item/${ad.id}`} elevation={1}>
      <div className={styles.card__media}>
        <img src={thumbnail} alt={ad.title} className={styles.card__image} loading='lazy' />
        {ad.priority === 'urgent' && <span className={styles.card__priority}>Срочно</span>}
      </div>

      <div className={styles.card__main}>
        <div className={styles.card__titleRow}>
          <span className={styles.card__title}>{ad.title}</span>
          <Chip
            size='small'
            label={statusLabel[ad.status]}
            color={statusColor[ad.status]}
            variant='outlined'
          />
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
