import { addDays, format } from 'date-fns'

export const toISODateWithZeroTime = (date: Date): string => `${format(date, 'yyyy-MM-dd')}T00:00:00.000Z`

export const getTomorrow = (): Date => addDays(new Date(), 1)
