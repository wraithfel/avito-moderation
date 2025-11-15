export interface AdsPaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}
