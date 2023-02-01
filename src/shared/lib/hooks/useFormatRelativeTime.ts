import { useIntl } from 'react-intl'

export const useFormatRelativeTime = () => {
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
