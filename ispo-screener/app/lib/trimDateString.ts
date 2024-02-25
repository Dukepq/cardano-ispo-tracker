export default function trimDateString(date: string | undefined | null) {
  if (!date || isNaN(new Date(date).getTime())) return null;
  return date.split("T")[0];
}
