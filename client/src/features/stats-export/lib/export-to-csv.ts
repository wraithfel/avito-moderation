import { downloadFile } from './download-file';

export type CsvRow = Record<string, string | number | null | undefined>;

const normalizeValue = (value: string | number | null | undefined): string => {
  if (value === null || value === undefined) {
    return '';
  }
  return String(value).replace(/"/g, '""');
};

export const exportStatsToCsv = (rows: CsvRow[], filename: string): void => {
  if (!rows.length) return;

  const headers = Object.keys(rows[0]);
  const headerLine = headers.map((h) => `"${normalizeValue(h)}"`).join(',');

  const dataLines = rows.map((row) => headers.map((h) => `"${normalizeValue(row[h])}"`).join(','));

  const csv = [headerLine, ...dataLines].join('\r\n');

  downloadFile(csv, filename, 'text/csv;charset=utf-8;');
};
