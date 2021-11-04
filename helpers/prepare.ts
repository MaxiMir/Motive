const THOUSAND = 1000
const MILLION = 1000000
const BILLION = 1000000000

/**
 * Reduces the number entry
 */
export const numberToShort = (value: number): string => {
  switch (true) {
    case value > THOUSAND && value < MILLION:
      return `${truncated(value / THOUSAND)}K`
    case value >= MILLION:
      return `${truncated(value / MILLION)}M`
    case value >= BILLION:
      return `${truncated(value / MILLION)}B`
    default:
      return String(value)
  }
}

/**
 * Truncation of decimal numbers
 */
const truncated = (num: number, decimalPlaces = 1): number => {
  const numPowerConverter = 10 ** decimalPlaces

  return ~~(num * numPowerConverter) / numPowerConverter
}

export const toUpperFirstChar = (string: string): string => string[0].toUpperCase() + string.slice(1)

export const toUserName = (firstName: string, lastName: string): string => [firstName, lastName].join(' ')
