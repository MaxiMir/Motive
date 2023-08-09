export function getReadTime(value: string): number {
  const wordsPerMinute = 200
  const wordsCount = value.split(' ').length

  return Math.ceil(wordsCount / wordsPerMinute)
}
