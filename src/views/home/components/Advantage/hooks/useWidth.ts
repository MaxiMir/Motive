import { useIntl } from 'react-intl'
import { Locale } from '@features/locale'

export const useWidth = () => {
  const { locale } = useIntl()

  switch (locale) {
    case Locale.En:
      return 285
    case Locale.Zh:
      return 240
    default:
      return 320
  }
}
