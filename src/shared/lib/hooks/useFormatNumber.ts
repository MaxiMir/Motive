import { useIntl } from 'react-intl'

export function useFormatNumber() {
  const { locale } = useIntl()

  return (value: number) => {
    const formatter = Intl.NumberFormat(locale, { notation: 'compact' })

    return formatter.format(value)
  }
}
