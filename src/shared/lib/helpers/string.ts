export const toShortString = (value: string, count: number) =>
  value.length < count ? value : `${value.slice(0, count - 3)}...`

type Options = [single: string, double: string, doubleGenitive: string]

export const getWordDeclination = (
  number: number,
  [single, double, doubleGenitive]: Options,
): string => {
  const numberAbs = Math.abs(number)
  const rest = numberAbs % 100

  if (rest > 10 && rest < 20) {
    return doubleGenitive
  }

  const restFrom10 = rest % 10

  if (restFrom10 === 1) {
    return single
  }

  if (restFrom10 > 1 && restFrom10 < 5) {
    return double
  }

  return doubleGenitive
}

export const ucFirst = (value: string) => value && value[0].toUpperCase() + value.slice(1)
