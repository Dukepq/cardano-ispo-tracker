export default function forceNum(value: any, fallback = 0): number {
  if (typeof value !== "string" && typeof value !== "number") return fallback;
  const num = Number(value);
  if (isNaN(num)) return fallback;
  else return num;
}
