export const formatDateTime = (
  value: string | number | Date,
  options?: Intl.DateTimeFormatOptions,
  locale: string = 'ru-RU',
): string => {
  if (!value) return '';

  const date = value instanceof Date ? value : new Date(value);

  return date.toLocaleString(
    locale,
    options ?? {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    },
  );
};

export const formatCurrency = (
  value: number,
  currency: string = 'RUB',
  locale: string = 'ru-RU',
): string => {
  if (value === null || value === undefined || Number.isNaN(value)) return '';

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value);
};
