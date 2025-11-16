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

  const isRejectMode = openMode === 'reject';
  const isCommentRequired = isRejectMode;
  const isCommentEmpty = !comment.trim();

  const isSubmitDisabled = isMutating || !selectedReason || (isCommentRequired && isCommentEmpty);

  return (
    <Dialog open={open} onClose={() => !isMutating && onClose()} fullWidth maxWidth='sm'>
      <DialogTitle>{isRejectMode ? 'Отклонить объявление' : 'Вернуть на доработку'}</DialogTitle>
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
          id='moderation-comment'
          name='moderationComment'
          sx={{ mt: 2 }}
          fullWidth
          multiline
          minRows={3}
          label={isRejectMode ? 'Причина отклонения (обязательно)' : 'Комментарий (необязательно)'}
          required={isRejectMode}
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
          color={isRejectMode ? 'error' : 'warning'}
          disabled={isSubmitDisabled}
        >
          Подтвердить
        </Button>
      </DialogActions>
    </Dialog>
  );
};
