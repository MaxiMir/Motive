export const getReadTime = (value: string): number => {
  const wordsPerMinute = 200
  const textLength = value.split(' ').length

  return Math.ceil(textLength / wordsPerMinute)
}
