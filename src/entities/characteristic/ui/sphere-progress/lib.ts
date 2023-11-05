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

const MAX_VALUE = 10

export function toVariables(background: string, value: number, compact?: boolean) {
  const width = compact ? 30 : 40
  const height = compact ? 200 : 300
  const bubble = compact ? 7 : 11
  const digit = compact ? 24 : 32
  const titleBottom = compact ? 75 : 82
  const progress = height - (value / MAX_VALUE) * height

  return {
    '--width': `${width}px`,
    '--height': `${height}px`,
    '--bubble': `${bubble}px`,
    '--digit': `${digit}px`,
    '--title-bottom': `${titleBottom}px`,
    '--background': background,
    '--progress': `${progress}px`,
  }
}
