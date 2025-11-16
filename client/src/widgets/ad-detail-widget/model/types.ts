import type { Advertisement } from '@/entities/ad';

export interface AdDetailsWidgetProps {
  adId: number;
}

export type DecisionMode = 'reject' | 'changes';

export type ModerationReason =
  | 'Запрещенный товар'
  | 'Неверная категория'
  | 'Некорректное описание'
  | 'Проблемы с фото'
  | 'Подозрение на мошенничество'
  | 'Другое';

export interface ModerationSnackbarState {
  open: boolean;
  message: string;
}

export interface AdDetailsHeaderProps {
  ad: Advertisement;
  onBack: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export interface AdGalleryProps {
  title: string;
  category: string;
  images: string[];
}

export interface AdDescriptionProps {
  description: string;
  characteristics: Record<string, string>;
}

export interface SellerCardProps {
  seller: Advertisement['seller'];
}

export interface ModerationActionsProps {
  status: Advertisement['status'];
  isMutating: boolean;
  onApprove: () => void;
  onRejectClick: () => void;
  onChangesClick: () => void;
}

export interface ModerationHistoryProps {
  history: Advertisement['moderationHistory'];
}

export interface ModerationDialogProps {
  openMode: DecisionMode | null;
  isMutating: boolean;
  selectedReason: ModerationReason;
  comment: string;
  onReasonChange: (reason: ModerationReason) => void;
  onCommentChange: (value: string) => void;
  onClose: () => void;
  onSubmit: () => void;
}
