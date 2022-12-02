import { addDays, formatDistanceToNow, Locale } from 'date-fns'

export const getToday = (): Date => {
  return new Date(new Date().setHours(0, 0, 0, 0))
}

export const getTomorrow = (): Date => {
  return new Date(addDays(new Date(), 1).setHours(0, 0, 0, 0))
}

export const getDistance = (date: string, locale: Locale): string => {
  return formatDistanceToNow(new Date(date), { includeSeconds: true, locale })
}

export const getLocaleFolder = (locale: string): string => {
  switch (locale) {
    case 'en':
      return 'en-US'
    default:
      return locale
  }
}

export const getIntlKey = (dayDifference: number): string | undefined => {
  switch (dayDifference) {
    case 1:
      return 'yesterday'
    case 0:
      return 'today'
    case -1:
      return 'tomorrow'
    default:
      return undefined
  }
}
