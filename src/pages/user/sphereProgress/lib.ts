function toRandomNumber(min: number, max: number): number {
  return Math.floor(min + Math.random() * (max + 1 - min))
}

export function getBubblesSetup(count: number) {
  return [...new Array(count)].map((_, key) => ({
    key,
    sx: {
      top: `${toRandomNumber(80, 100)}%`,
      right: `${toRandomNumber(4, 18)}px`,
      opacity: toRandomNumber(2, 4) / 10,
      animationDelay: `${toRandomNumber(0, count)}s`,
    },
  }))
}
