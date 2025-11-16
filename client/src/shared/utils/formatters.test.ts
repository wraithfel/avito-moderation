import { describe, it, expect } from 'vitest';
import { formatCurrency, formatDateTime } from './formatters';

describe('formatCurrency', () => {
  it('returns empty string for invalid value', () => {
    const result = formatCurrency(Number.NaN);
    expect(result).toBe('');
  });

  it('formats number as currency', () => {
    const result = formatCurrency(1000, 'USD', 'en-US');
    expect(typeof result).toBe('string');
    expect(result).toContain('$');
  });
});

describe('formatDateTime', () => {
  it('returns empty string for falsy value', () => {
    const result = formatDateTime('' as unknown as string);
    expect(result).toBe('');
  });

  it('formats date to non-empty string', () => {
    const result = formatDateTime('2025-01-01T00:00:00.000Z');
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });
});
