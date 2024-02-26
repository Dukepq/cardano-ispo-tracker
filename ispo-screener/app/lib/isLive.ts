export default function isLive<T extends string | undefined | null>(
  startDate: T,
  endDate: T
): boolean {
  const start = startDate ? Date.parse(startDate) : Infinity;
  const end = endDate ? Date.parse(endDate) : Infinity;
  const now = Date.now();
  return now >= start && now < end;
}
