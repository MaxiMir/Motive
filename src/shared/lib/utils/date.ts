import { addDays, formatISO, startOfDay } from 'date-fns'

export const getMidnight = (): Date => startOfDay(new Date())

export const getMidnightISO = (): string => formatISO(getMidnight())

export const getTomorrow = (): Date => startOfDay(addDays(new Date(), 1))

export const getTomorrowISO = (): string => formatISO(getTomorrow())

export const getLocaleFolder = (locale: string): string => {
  switch (locale) {
    case 'en':
      return 'en-US'
    default:
      return locale
  }
}
