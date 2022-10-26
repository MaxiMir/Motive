import { addDays, formatDistanceToNow } from 'date-fns'
import { enUS, ru, uk } from 'date-fns/locale'
import { Locale } from '@hooks/useSetLocale'

export const getToday = (): Date => new Date(new Date().setHours(0, 0, 0, 0))

export const getTomorrow = (): Date => new Date(addDays(new Date(), 1).setHours(0, 0, 0, 0))

export const getDistance = (date: string, locale: Locale): string => {
  const fnsLocale = getFnsLocale(locale)

  return formatDistanceToNow(new Date(date), { includeSeconds: true, locale: fnsLocale })
}

export const getFnsLocale = (locale: Locale) => {
  switch (locale) {
    case 'ru':
      return ru
    case 'uk':
      return uk
    default:
      return enUS
  }
}
