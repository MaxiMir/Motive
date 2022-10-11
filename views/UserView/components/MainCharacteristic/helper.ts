export const RADIUS = 175
const DIAMETER = Math.round(Math.PI * RADIUS * 2)

export const getOffset = (value: number): number => {
  const rest = (value % 1) * 100

  return Math.round(((100 - Math.min(rest, 100)) / 100) * DIAMETER)
}
