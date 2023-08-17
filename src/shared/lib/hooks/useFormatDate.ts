import { useIntl } from 'react-intl'

export function useFormatDate() {
  const { locale } = useIntl()

  return (value: string | Date, options?: Intl.DateTimeFormatOptions) => {
    const date = typeof value === 'string' ? new Date(value) : value

    return new Intl.DateTimeFormat(locale, options).format(date)
  }
}
