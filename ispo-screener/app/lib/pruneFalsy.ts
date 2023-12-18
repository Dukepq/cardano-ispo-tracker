export default function pruneFalsy<T extends { [key: string]: any }>(
  object: T
): Partial<T> {
  return Object.fromEntries(
    Object.entries(object).filter(
      ([_, value]) => typeof value === "boolean" || !!value
    )
  ) as Partial<T>;
}
