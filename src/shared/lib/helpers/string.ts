export function toShortString(value: string, count: number) {
  return value.length < count ? value : `${value.slice(0, count - 3)}...`
}
