export default function truncateString(string: string, maxCharacters: number) {
  if (string.length < maxCharacters) return string;
  else return string.slice(0, maxCharacters) + "...";
}
