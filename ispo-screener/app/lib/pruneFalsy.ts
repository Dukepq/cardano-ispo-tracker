export default function pruneFalsy<T extends { [key: string]: any }>(
  object: T,
  exceptions?: (
    | "string"
    | "number"
    | "bigint"
    | "boolean"
    | "symbol"
    | "undefined"
    | "object"
    | "function"
  )[]
): Partial<T> {
  return Object.fromEntries(
    Object.entries(object).filter(
      ([_, value]) => exceptions?.includes(typeof value) || !!value
    )
  ) as Partial<T>;
}
