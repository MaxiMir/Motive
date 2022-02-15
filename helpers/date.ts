import { addDays, format } from 'date-fns'

export const toISODateWithZeroTime = (date: Date): string => format(date, 'yyyy-MM-dd')

export const getTomorrow = (): Date => addDays(new Date(), 1)
