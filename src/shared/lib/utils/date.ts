import { addDays, formatISO, startOfDay } from 'date-fns'

export function getMidnight() {
  return startOfDay(new Date())
}

export function getMidnightISO() {
  return formatISO(getMidnight())
}

export function getTomorrow() {
  return startOfDay(addDays(new Date(), 1))
}

export function getTomorrowISO() {
  return formatISO(getTomorrow())
}

export function getLocaleFolder(locale: string): string {
  switch (locale) {
    case 'en':
      return 'en-US'
    default:
      return locale
  }
}
