import { Locale } from 'hooks/useLocale'
import i18n from './i18n'

interface OnlineProps {
  locale: Locale
}

export default function Online({ locale }: OnlineProps) {
  const { online } = i18n[locale]

  return <>{online}</>
}
