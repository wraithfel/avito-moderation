import type { CsvRow } from './export-to-csv';

const groupBySection = (rows: CsvRow[]): Record<string, CsvRow[]> => {
  return rows.reduce<Record<string, CsvRow[]>>((acc, row) => {
    const section = row.Раздел || 'Раздел';
    if (!acc[section]) {
      acc[section] = [];
    }
    acc[section].push(row);
    return acc;
  }, {});
};

const buildHtml = (rows: CsvRow[], title: string): string => {
  const grouped = groupBySection(rows);

  const sectionsHtml = Object.entries(grouped)
    .map(([section, sectionRows]) => {
      const bodyRows = sectionRows
        .map(
          (row) => `
            <tr>
              <td>${row.Метрика}</td>
              <td>${row.Значение}</td>
              <td>${row.Дополнительно ?? ''}</td>
            </tr>
          `,
        )
        .join('');

      return `
        <section class="section">
          <h2 class="section-title">${section}</h2>
          <table class="table">
            <thead>
              <tr>
                <th>Метрика</th>
                <th>Значение</th>
                <th>Комментарий</th>
              </tr>
            </thead>
            <tbody>
              ${bodyRows}
            </tbody>
          </table>
        </section>
      `;
    })
    .join('');

  const now = new Date();
  const generatedAt = now.toLocaleString('ru-RU');

  return `
    <!doctype html>
    <html lang="ru">
      <head>
        <meta charset="UTF-8" />
        <title>${title}</title>
        <style>
          * {
            box-sizing: border-box;
          }
          body {
            margin: 0;
            padding: 24px;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
            font-size: 12px;
            color: #111827;
            background-color: #ffffff;
          }
          h1 {
            font-size: 20px;
            margin: 0 0 4px;
          }
          .meta {
            font-size: 11px;
            color: #6b7280;
            margin-bottom: 16px;
          }
          .section {
            margin-bottom: 16px;
            page-break-inside: avoid;
          }
          .section-title {
            font-size: 14px;
            margin: 0 0 6px;
            color: #111827;
          }
          .table {
            width: 100%;
            border-collapse: collapse;
            font-size: 11px;
          }
          .table th,
          .table td {
            border: 1px solid #e5e7eb;
            padding: 4px 6px;
            vertical-align: top;
          }
          .table th {
            background-color: #f3f4f6;
            font-weight: 600;
          }
          .table tbody tr:nth-child(even) td {
            background-color: #f9fafb;
          }
          @media print {
            body {
              padding: 12mm;
            }
            .no-print {
              display: none;
            }
          }
        </style>
      </head>
      <body>
        <div class="no-print" style="margin-bottom:12px;">
          <button onclick="window.print()" style="padding:6px 10px;font-size:11px;">
            Печать / Сохранить как PDF
          </button>
        </div>
        <h1>${title}</h1>
        <div class="meta">Отчёт сгенерирован: ${generatedAt}</div>
        ${sectionsHtml}
        <script>
          setTimeout(function () {
            window.print();
          }, 400);
        </script>
      </body>
    </html>
  `;
};

export const downloadPdf = (rows: CsvRow[], title: string) => {
  if (!rows.length) return;

  const html = buildHtml(rows, title);
  const reportWindow = window.open('', '_blank');

  if (!reportWindow) return;

  reportWindow.document.open('text/html', 'replace');
  reportWindow.document.write(html);
  reportWindow.document.close();
};
