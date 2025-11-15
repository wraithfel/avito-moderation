import type { AdStatus } from '../../model/types';

export const statusLabel: Record<AdStatus, string> = {
  pending: 'На модерации',
  approved: 'Одобрено',
  rejected: 'Отклонено',
  draft: 'Черновик',
};

export const statusColor: Record<AdStatus, 'default' | 'success' | 'error' | 'warning'> = {
  pending: 'warning',
  approved: 'success',
  rejected: 'error',
  draft: 'default',
};
