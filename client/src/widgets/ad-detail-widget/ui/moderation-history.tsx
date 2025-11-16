import { Typography } from '@mui/material';
import styles from './ad-details-widget.module.scss';
import type { ModerationHistoryProps } from '../model/types';
import { formatDateTime } from '@/shared/utils';

export const ModerationHistory = ({ history }: ModerationHistoryProps) => {
  return (
    <section className={styles.details__historyCard}>
      <Typography variant='subtitle2'>История модерации</Typography>

      {history.length === 0 ? (
        <Typography variant='body2' color='text.secondary' className={styles.details__historyList}>
          История модерации отсутствует.
        </Typography>
      ) : (
        <div className={styles.details__historyList}>
          {history.map((item) => (
            <div key={item.id} className={styles.details__historyItem}>
              <strong>{item.moderatorName}</strong> · {formatDateTime(item.timestamp)} ·{' '}
              {item.action === 'approved'
                ? 'Одобрено'
                : item.action === 'rejected'
                  ? 'Отклонено'
                  : 'Запрошены изменения'}
              {item.reason && ` — ${item.reason}`}
              {item.comment && (
                <>
                  <br />
                  <span>{item.comment}</span>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
