import { Typography } from '@mui/material';
import styles from './ad-details-widget.module.scss';
import type { SellerCardProps } from '../model/types';
import { formatDateTime } from '@/shared/utils';

export const SellerCard = ({ seller }: SellerCardProps) => {
  return (
    <aside className={styles.details__sellerCard}>
      <Typography className={styles.details__sellerTitle}>Продавец</Typography>
      <Typography variant='body1'>{seller.name}</Typography>
      <div className={styles.details__sellerMeta}>
        <span>Рейтинг: {seller.rating}</span>
        <span>Всего объявлений: {seller.totalAds}</span>
        <span>
          На платформе с:{' '}
          {formatDateTime(seller.registeredAt, {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })}
        </span>
      </div>
    </aside>
  );
};
