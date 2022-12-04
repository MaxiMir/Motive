import { addDays } from 'date-fns'

export const getMidnight = (): Date => {
  return new Date(new Date().setHours(0, 0, 0, 0))
}

export const getTomorrow = (): Date => {
  return new Date(addDays(new Date(), 1).setHours(0, 0, 0, 0))
}

export const getLocaleFolder = (locale: string): string => {
  switch (locale) {
    case 'en':
      return 'en-US'
    default:
      return locale
  }
}
