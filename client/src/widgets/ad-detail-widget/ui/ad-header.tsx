import { Button, Chip } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

import styles from './ad-details-widget.module.scss';
import type { AdDetailsHeaderProps } from '../model/types';
import { formatCurrency, formatDateTime } from '@/shared/utils';
import { statusColor, statusLabel } from '@/entities/ad/ui/ad-card/constants';

export const AdDetailsHeader = ({ ad, onBack, onPrev, onNext }: AdDetailsHeaderProps) => {
  return (
    <header className={styles.details__header}>
      <div className={styles.details__titleBlock}>
        <div className={styles.details__titleRow}>
          <h1 className={styles.details__title}>{ad.title}</h1>
          <Chip
            size='small'
            label={statusLabel[ad.status]}
            color={statusColor[ad.status]}
            variant='outlined'
          />
          {ad.priority === 'urgent' && (
            <span className={styles.details__priority}>Срочное объявление</span>
          )}
        </div>
        <div className={styles.details__meta}>
          <span>Категория: {ad.category}</span>
          <span>Цена: {formatCurrency(ad.price)}</span>
          <span>Создано: {formatDateTime(ad.createdAt)}</span>
          <span>ID: {ad.id}</span>
        </div>
      </div>

      <div className={styles.details__backActions}>
        <Button variant='outlined' size='small' startIcon={<ArrowBack />} onClick={onBack}>
          К списку
        </Button>
        <Button variant='outlined' size='small' startIcon={<ArrowBack />} onClick={onPrev}>
          Предыдущее
        </Button>
        <Button variant='outlined' size='small' endIcon={<ArrowForward />} onClick={onNext}>
          Следующее
        </Button>
      </div>
    </header>
  );
};
