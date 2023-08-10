import { useIntl } from 'react-intl'

export function useWordDeclination(name: string, value: number) {
  const { formatMessage } = useIntl()
  const single = formatMessage({ id: `common.${name}-single` })
  const double = formatMessage({ id: `common.${name}-double` })
  const multiple = formatMessage({ id: `common.${name}-genitive` })
  const numberAbs = Math.abs(value)
  const rest = numberAbs % 100

  if (rest > 10 && rest < 20) {
    return multiple
  }

  const restFrom10 = rest % 10

  if (restFrom10 === 1) {
    return single
  }

  if (restFrom10 > 1 && restFrom10 < 5) {
    return double
  }

  return multiple
}
