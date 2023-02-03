import { addDays, formatISO, startOfDay } from 'date-fns'

export const getMidnight = () => startOfDay(new Date())

export const getMidnightISO = () => formatISO(getMidnight())

export const getTomorrow = () => startOfDay(addDays(new Date(), 1))

export const getTomorrowISO = () => formatISO(getTomorrow())

export const getLocaleFolder = (locale: string): string => {
  switch (locale) {
    case 'en':
      return 'en-US'
    default:
      return locale
  }
}
