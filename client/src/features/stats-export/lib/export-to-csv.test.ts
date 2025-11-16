import { describe, it, expect, vi, type MockedFunction } from 'vitest';

import { exportStatsToCsv } from './export-to-csv';
import { downloadFile } from './download-file';

vi.mock('./download-file', () => {
  return {
    downloadFile: vi.fn(),
  };
});

describe('exportStatsToCsv', () => {
  it('does nothing for empty rows', () => {
    exportStatsToCsv([], 'file.csv');
    expect(downloadFile).not.toHaveBeenCalled();
  });

  it('calls downloadFile with csv content and filename', () => {
    const rows = [
      { a: 'x', b: 1 },
      { a: 'y', b: 2 },
    ];

    exportStatsToCsv(rows, 'stats.csv');

    expect(downloadFile).toHaveBeenCalledTimes(1);

    const mockedDownloadFile = downloadFile as MockedFunction<typeof downloadFile>;
    const [content, filename, mime] = mockedDownloadFile.mock.calls[0];

    expect(filename).toBe('stats.csv');
    expect(typeof content).toBe('string');
    expect((content as string).split('\r\n')).toHaveLength(3);
    expect(mime).toContain('text/csv');
  });
});
