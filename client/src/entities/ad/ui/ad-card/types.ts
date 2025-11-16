import type { Advertisement } from '../../model/types';

export interface AdCardProps {
  ad: Advertisement;
  selectable?: boolean;
  selected?: boolean;
  onSelectChange?: (selected: boolean) => void;
}
