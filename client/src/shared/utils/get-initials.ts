export const getInitials = (fullName: string) => {
  if (!fullName) return '';
  const parts = fullName.split(' ').filter(Boolean);
  if (!parts.length) return '';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
};
