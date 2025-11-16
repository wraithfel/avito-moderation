import { Button, Typography } from '@mui/material';

import styles from './bulk-selection-bar.module.scss';

interface BulkSelectionBarProps {
  selectedCount: number;
  isProcessing: boolean;
  onApproveSelected: () => void;
  onRejectSelected: () => void;
  onClear: () => void;
}

export const BulkSelectionBar = ({
  selectedCount,
  isProcessing,
  onApproveSelected,
  onRejectSelected,
  onClear,
}: BulkSelectionBarProps) => {
  if (selectedCount === 0) {
    return null;
  }

  return (
    <div className={styles.bulkBar}>
      <Typography className={styles.bulkBar__info}>
        Выбрано объявлений: <span className={styles.bulkBar__count}>{selectedCount}</span>
      </Typography>

      <div className={styles.bulkBar__actions}>
        <Button
          size='small'
          variant='contained'
          color='success'
          disabled={isProcessing}
          onClick={onApproveSelected}
        >
          Одобрить выбранные
        </Button>
        <Button
          size='small'
          variant='contained'
          color='error'
          disabled={isProcessing}
          onClick={onRejectSelected}
        >
          Отклонить выбранные
        </Button>
        <Button size='small' variant='text' disabled={isProcessing} onClick={onClear}>
          Снять выбор
        </Button>
      </div>
    </div>
  );
};
