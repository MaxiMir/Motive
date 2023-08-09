import { useIntl } from 'react-intl'

export function useFormatDate() {
  const { locale } = useIntl()

  return (value: string, options?: Intl.DateTimeFormatOptions) => {
    const date = new Date(value)

    return new Intl.DateTimeFormat(locale, options).format(date)
  }
}
