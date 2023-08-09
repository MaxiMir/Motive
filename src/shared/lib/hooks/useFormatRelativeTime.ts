import { useIntl } from 'react-intl'

export function useFormatRelativeTime() {
  const { locale } = useIntl()

  return (
    value: number,
    unit: Intl.RelativeTimeFormatUnit,
    options?: Intl.RelativeTimeFormatOptions,
  ) => {
    const intl = new Intl.RelativeTimeFormat(locale, options)

    return intl.formatToParts(value, unit)
  }
}
