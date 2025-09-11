export function formatDate(dateValue: string | number): string {
  const raw = String(dateValue); // coerce to string
  const [year, month, day] = raw.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });
}
