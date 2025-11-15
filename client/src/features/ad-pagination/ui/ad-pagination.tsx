import { Pagination } from '@mui/material';
import type { AdsPaginationProps } from '../model';

export const AdsPagination = ({ page, totalPages, onChange }: AdsPaginationProps) => {
  return (
    <Pagination
      count={totalPages}
      page={page}
      onChange={(_, value) => onChange(value)}
      color='primary'
      shape='rounded'
      size='small'
    />
  );
};
