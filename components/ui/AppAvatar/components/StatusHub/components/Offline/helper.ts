export const getShortDistance = (distance: string): string => {
  const words = distance.split(' ')
  const value = words.at(-2)?.replace(/\D/g, '')
  const measurement = words.at(-1)?.[0] || ''

  return `${value} ${measurement}`
}
