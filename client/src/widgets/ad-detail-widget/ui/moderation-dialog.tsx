import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';

import type { ModerationDialogProps } from '../model/types';
import { MODERATION_REASONS } from '../model/constants';

export const ModerationDialog = ({
  openMode,
  isMutating,
  selectedReason,
  comment,
  onReasonChange,
  onCommentChange,
  onClose,
  onSubmit,
}: ModerationDialogProps) => {
  const open = openMode !== null;

  return (
    <Dialog open={open} onClose={() => !isMutating && onClose()} fullWidth maxWidth='sm'>
      <DialogTitle>
        {openMode === 'reject' ? 'Отклонить объявление' : 'Вернуть на доработку'}
      </DialogTitle>
      <DialogContent>
        <FormControl component='fieldset' sx={{ mt: 1 }}>
          <RadioGroup
            value={selectedReason}
            onChange={(e) => onReasonChange(e.target.value as typeof selectedReason)}
          >
            {MODERATION_REASONS.map((reason) => (
              <FormControlLabel
                key={reason}
                value={reason}
                control={<Radio size='small' />}
                label={reason}
              />
            ))}
          </RadioGroup>
        </FormControl>

        <TextField
          sx={{ mt: 2 }}
          fullWidth
          multiline
          minRows={3}
          label='Комментарий (необязательно)'
          value={comment}
          onChange={(e) => onCommentChange(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isMutating}>
          Отмена
        </Button>
        <Button
          onClick={onSubmit}
          variant='contained'
          color={openMode === 'reject' ? 'error' : 'warning'}
          disabled={isMutating || !selectedReason}
        >
          Подтвердить
        </Button>
      </DialogActions>
    </Dialog>
  );
};
