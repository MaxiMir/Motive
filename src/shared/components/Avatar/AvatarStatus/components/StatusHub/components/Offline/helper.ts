export const getShortDistance = (distance: string): string => {
  const words = distance.split(' ')
  const value = words.at(-3)?.replace(/\D/g, '')
  const measurement = words.at(-2)?.[0]

  return `${value} ${measurement}.`
}
