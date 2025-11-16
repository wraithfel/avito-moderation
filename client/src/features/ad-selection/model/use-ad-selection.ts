import { useCallback, useState } from 'react';

export const useAdSelection = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const setSelected = useCallback((id: number, selected: boolean) => {
    setSelectedIds((prev) => {
      const exists = prev.includes(id);
      if (selected) {
        return exists ? prev : [...prev, id];
      }
      return exists ? prev.filter((value) => value !== id) : prev;
    });
  }, []);

  const toggle = useCallback((id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((value) => value !== id) : [...prev, id],
    );
  }, []);

  const reset = useCallback(() => {
    setSelectedIds([]);
  }, []);

  const isSelected = useCallback(
    (id: number) => {
      return selectedIds.includes(id);
    },
    [selectedIds],
  );

  return {
    selectedIds,
    setSelected,
    toggle,
    reset,
    isSelected,
  };
};
