export function getOffset(value: number, radius: number) {
  const diameter = Math.round(Math.PI * radius * 2)
  const rest = (value % 1) * 100

  return Math.round(((100 - Math.min(rest, 100)) / 100) * diameter)
}
