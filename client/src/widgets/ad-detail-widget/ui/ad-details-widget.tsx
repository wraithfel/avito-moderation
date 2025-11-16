import { useCallback, useEffect, useState } from 'react';
import { Alert, Box, CircularProgress, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import { adQueries, useGetAd, useApproveAd, useRejectAd, useRequestChanges } from '@/entities/ad';
import type { ModerationPayload } from '@/entities/ad';

import styles from './ad-details-widget.module.scss';
import type {
  AdDetailsWidgetProps,
  DecisionMode,
  ModerationReason,
  ModerationSnackbarState,
} from '../model/types';

import { AdDetailsHeader } from './ad-header';
import { AdGallery } from './ad-gallery';
import { AdDescription } from './ad-description';
import { SellerCard } from './seller-card';
import { ModerationActions } from './moderation-actions';
import { ModerationHistory } from './moderation-history';
import { ModerationDialog } from './moderation-dialog';

const AdDetailsWidget = ({ adId }: AdDetailsWidgetProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: ad, isLoading, isError, refetch } = useGetAd(adId);

  const [decisionDialogOpen, setDecisionDialogOpen] = useState<DecisionMode | null>(null);
  const [selectedReason, setSelectedReason] = useState<ModerationReason>('Запрещенный товар');
  const [comment, setComment] = useState('');
  const [snackbar, setSnackbar] = useState<ModerationSnackbarState>({
    open: false,
    message: '',
  });

  const approveMutation = useApproveAd(adId);
  const rejectMutation = useRejectAd(adId);
  const requestChangesMutation = useRequestChanges(adId);

  useEffect(() => {
    const prevId = adId - 1;
    const nextId = adId + 1;

    if (prevId > 0) {
      queryClient.prefetchQuery(adQueries.byId(prevId));
    }

    queryClient.prefetchQuery(adQueries.byId(nextId));
  }, [adId, queryClient]);

  const isMutating =
    approveMutation.isPending || rejectMutation.isPending || requestChangesMutation.isPending;

  const handleBack = useCallback(() => {
    navigate('/list');
  }, [navigate]);

  const handlePrev = useCallback(() => {
    if (adId > 1) {
      navigate(`/item/${adId - 1}`);
    }
  }, [adId, navigate]);

  const handleNext = useCallback(() => {
    navigate(`/item/${adId + 1}`);
  }, [adId, navigate]);

  const handleApprove = useCallback(async () => {
    try {
      await approveMutation.mutateAsync();
      setSnackbar({ open: true, message: 'Объявление одобрено' });
    } catch {
      setSnackbar({ open: true, message: 'Не удалось одобрить объявление' });
    }
  }, [approveMutation]);

  const handleOpenDecisionDialog = useCallback((mode: DecisionMode) => {
    setDecisionDialogOpen(mode);
    setSelectedReason('Запрещенный товар');
    setComment('');
  }, []);

  const handleDecisionSubmit = async () => {
    if (!decisionDialogOpen) return;

    const payload: ModerationPayload = {
      reason: selectedReason,
      comment: comment.trim() || undefined,
    };

    try {
      if (decisionDialogOpen === 'reject') {
        await rejectMutation.mutateAsync(payload);
        setSnackbar({ open: true, message: 'Объявление отклонено' });
      } else {
        await requestChangesMutation.mutateAsync(payload);
        setSnackbar({ open: true, message: 'Запрос на доработку отправлен' });
      }
      setDecisionDialogOpen(null);
    } catch {
      setSnackbar({
        open: true,
        message: 'Не удалось выполнить действие модерации',
      });
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const tagName = target?.tagName.toLowerCase();

      if (tagName === 'input' || tagName === 'textarea' || target?.isContentEditable) {
        return;
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        handlePrev();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        handleNext();
      } else if (event.key === 'a' || event.key === 'A') {
        event.preventDefault();
        if (!isMutating) {
          void handleApprove();
        }
      } else if (event.key === 'd' || event.key === 'D') {
        event.preventDefault();
        if (!isMutating) {
          handleOpenDecisionDialog('reject');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handlePrev, handleNext, handleApprove, handleOpenDecisionDialog, isMutating]);

  if (isLoading) {
    return (
      <section className={styles.details}>
        <div className={styles.details__loader}>
          <CircularProgress size={32} />
        </div>
      </section>
    );
  }

  if (isError || !ad) {
    return (
      <section className={styles.details}>
        <div className={styles.details__error}>
          <Alert
            severity='error'
            variant='outlined'
            action={
              <Box component='button' onClick={() => refetch()}>
                Повторить
              </Box>
            }
          >
            Не удалось загрузить объявление.
          </Alert>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.details} aria-label='Карточка объявления'>
      <AdDetailsHeader ad={ad} onBack={handleBack} onPrev={handlePrev} onNext={handleNext} />

      <div className={styles.details__layout}>
        <div>
          <AdGallery title={ad.title} category={ad.category} images={ad.images} />
          <AdDescription description={ad.description} characteristics={ad.characteristics} />
        </div>

        <div>
          <SellerCard seller={ad.seller} />
          <ModerationActions
            status={ad.status}
            isMutating={isMutating}
            onApprove={handleApprove}
            onRejectClick={() => handleOpenDecisionDialog('reject')}
            onChangesClick={() => handleOpenDecisionDialog('changes')}
          />
        </div>
      </div>

      <ModerationHistory history={ad.moderationHistory} />

      <ModerationDialog
        openMode={decisionDialogOpen}
        isMutating={isMutating}
        selectedReason={selectedReason}
        comment={comment}
        onReasonChange={setSelectedReason}
        onCommentChange={setComment}
        onClose={() => setDecisionDialogOpen(null)}
        onSubmit={handleDecisionSubmit}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        message={snackbar.message}
      />
    </section>
  );
};

export { AdDetailsWidget };
