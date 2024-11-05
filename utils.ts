export function generateId(): number {
  return Math.floor(Math.random() * 10000);
}

export function formatDate(date: Date): string {
  return date.toISOString();
}
