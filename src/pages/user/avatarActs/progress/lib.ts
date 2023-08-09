export function getOffset(value: number, radius: number) {
  const diameter = Math.round(Math.PI * radius * 2)
  const residue = (value % 1) * 100

  if (!residue) return 0

  return Math.round(((100 - Math.min(residue, 100)) / 100) * diameter)
}
