import { Button, Stack } from '@mui/material';
import type { CsvRow } from '../lib/export-to-csv';
import { exportStatsToCsv } from '../lib/export-to-csv';
import { downloadPdf } from '../lib/export-to-pdf';

type StatsExportControlsProps = {
  rows: CsvRow[];
  filePrefix?: string;
  title?: string;
};

export const StatsExportControls = ({
  rows,
  filePrefix = 'moderation-stats',
  title = 'Статистика модерации',
}: StatsExportControlsProps) => {
  const handleExportCsv = () => {
    if (!rows.length) return;
    const filename = `${filePrefix}.csv`;
    exportStatsToCsv(rows, filename);
  };

  const handleExportPdf = () => {
    if (!rows.length) return;
    downloadPdf(rows, title);
  };

  return (
    <Stack direction='row' spacing={1} justifyContent='flex-end'>
      <Button variant='outlined' size='small' onClick={handleExportCsv}>
        Экспорт CSV
      </Button>
      <Button variant='outlined' size='small' onClick={handleExportPdf}>
        PDF-отчёт
      </Button>
    </Stack>
  );
};
