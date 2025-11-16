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
  Typography,
} from '@mui/material';

import { MODERATION_REASONS } from '@widgets/ad-detail-widget/model/constants';
import type { ModerationReason } from '@widgets/ad-detail-widget/model/types';

interface BulkRejectDialogProps {
  open: boolean;
  count: number;
  isLoading: boolean;
  reason: ModerationReason;
  comment: string;
  onReasonChange: (reason: ModerationReason) => void;
  onCommentChange: (value: string) => void;
  onClose: () => void;
  onConfirm: () => void;
}

export const BulkRejectDialog = ({
  open,
  count,
  isLoading,
  reason,
  comment,
  onReasonChange,
  onCommentChange,
  onClose,
  onConfirm,
}: BulkRejectDialogProps) => {
  const isConfirmDisabled = isLoading || !comment.trim();

  return (
    <Dialog open={open} onClose={() => !isLoading && onClose()} fullWidth maxWidth='sm'>
      <DialogTitle>Отклонить выбранные объявления</DialogTitle>
      <DialogContent>
        <Typography variant='body2' sx={{ mb: 1 }}>
          Вы выбрали {count} объявлений. Укажите причину отклонения и комментарий — он будет
          применён ко всем выбранным объявлениям.
        </Typography>

        <FormControl component='fieldset' sx={{ mt: 1 }}>
          <RadioGroup
            value={reason}
            onChange={(e) => onReasonChange(e.target.value as ModerationReason)}
          >
            {MODERATION_REASONS.map((item) => (
              <FormControlLabel
                key={item}
                value={item}
                control={<Radio size='small' />}
                label={item}
              />
            ))}
          </RadioGroup>
        </FormControl>

        <TextField
          id='bulk-moderation-comment'
          name='bulkModerationComment'
          sx={{ mt: 2 }}
          fullWidth
          multiline
          minRows={3}
          label='Комментарий для продавца (обязательно)'
          required
          value={comment}
          onChange={(e) => onCommentChange(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isLoading}>
          Отмена
        </Button>
        <Button onClick={onConfirm} variant='contained' color='error' disabled={isConfirmDisabled}>
          Отклонить {count}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
