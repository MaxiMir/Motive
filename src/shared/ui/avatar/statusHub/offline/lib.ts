export const getShortDistance = (distance: string) => {
  const words = distance.split(' ')
  const valueIndex = words.findIndex(parseFloat)
  const measurement = ~valueIndex ? words[valueIndex + 1][0] : words.at(-2)?.[0]
  const value = ~valueIndex ? `${words[valueIndex]} ` : ''

  return [value, measurement, '.'].join('')
}
