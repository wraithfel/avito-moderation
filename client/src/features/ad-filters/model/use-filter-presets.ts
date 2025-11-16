import { useCallback, useState } from 'react';
import type { AdsFilters } from './types';

const STORAGE_KEY = 'ams_filter_presets';

export interface FilterPreset {
  id: string;
  name: string;
  filters: AdsFilters;
  createdAt: string;
}

const readPresets = (): FilterPreset[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed as FilterPreset[];
  } catch {
    return [];
  }
};

const writePresets = (presets: FilterPreset[]) => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(presets));
  } catch (error) {
    console.log(error);
  }
};

const createId = () => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
};

export const useFilterPresets = () => {
  const [presets, setPresets] = useState<FilterPreset[]>(() => readPresets());

  const setAndPersist = useCallback((updater: (prev: FilterPreset[]) => FilterPreset[]) => {
    setPresets((prev) => {
      const next = updater(prev);
      writePresets(next);
      return next;
    });
  }, []);

  const savePreset = useCallback(
    (name: string, filters: AdsFilters) => {
      const trimmedName = name.trim();
      if (!trimmedName) return;

      setAndPersist((prev) => {
        const next: FilterPreset[] = [
          ...prev,
          {
            id: createId(),
            name: trimmedName,
            filters,
            createdAt: new Date().toISOString(),
          },
        ];
        return next;
      });
    },
    [setAndPersist],
  );

  const deletePreset = useCallback(
    (id: string) => {
      setAndPersist((prev) => prev.filter((preset) => preset.id !== id));
    },
    [setAndPersist],
  );

  return {
    presets,
    savePreset,
    deletePreset,
  };
};
