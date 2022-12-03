import { addDays, formatDistanceToNowStrict, Locale } from 'date-fns'

export const getToday = (): Date => {
  return new Date(new Date().setHours(0, 0, 0, 0))
}

export const getTomorrow = (): Date => {
  return new Date(addDays(new Date(), 1).setHours(0, 0, 0, 0))
}

export const getDistance = (date: string, locale: Locale): string => {
  return formatDistanceToNowStrict(new Date(date), { locale })
}

export const getLocaleFolder = (locale: string): string => {
  switch (locale) {
    case 'en':
      return 'en-US'
    default:
      return locale
  }
}

export const getIntlDayId = (dayDifference: number): string | undefined => {
  switch (dayDifference) {
    case 1:
      return 'common.yesterday'
    case 0:
      return 'common.today'
    case -1:
      return 'common.tomorrow'
    default:
      return undefined
  }
}
