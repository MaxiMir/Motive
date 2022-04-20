import { addDays } from 'date-fns'
import { enUS, ru } from 'date-fns/locale'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import i18nCommon from 'constants/i18n'
import { Locale } from 'hooks/useLocale'

export const getToday = (): Date => new Date(new Date().setHours(0, 0, 0, 0))

export const getTomorrow = (): Date => new Date(addDays(new Date(), 1).setHours(0, 0, 0, 0))

export const getDistance = (date: string, locale: Locale): string => {
  const fnsLocale = locale === 'ru' ? ru : enUS
  const { agoText } = i18nCommon[locale]
  const distance = formatDistanceToNow(new Date(date), { includeSeconds: true, locale: fnsLocale })

  return `${distance} ${agoText}`
}
