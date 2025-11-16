import { Button, Stack, Typography } from '@mui/material';
import { Check, Undo, Close as CloseIcon } from '@mui/icons-material';

import styles from './ad-details-widget.module.scss';
import type { ModerationActionsProps } from '../model/types';

export const ModerationActions = ({
  status,
  isMutating,
  onApprove,
  onRejectClick,
  onChangesClick,
}: ModerationActionsProps) => {
  return (
    <section className={styles.details__actionsCard}>
      <Typography variant='subtitle2'>Действия модератора</Typography>

      <Stack direction='row' spacing={1} className={styles.details__actionsRow}>
        <Button
          variant='contained'
          color='success'
          size='small'
          startIcon={<Check />}
          disabled={isMutating || status === 'approved'}
          onClick={onApprove}
        >
          Одобрить
        </Button>

        <Button
          variant='contained'
          color='error'
          size='small'
          startIcon={<CloseIcon />}
          disabled={isMutating || status === 'rejected'}
          onClick={onRejectClick}
        >
          Отклонить
        </Button>

        <Button
          variant='contained'
          color='warning'
          size='small'
          startIcon={<Undo />}
          disabled={isMutating}
          onClick={onChangesClick}
        >
          На доработку
        </Button>
      </Stack>

      {isMutating && (
        <Typography variant='caption' color='text.secondary'>
          Выполнение действия модерации…
        </Typography>
      )}
    </section>
  );
};
