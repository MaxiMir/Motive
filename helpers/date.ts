import { addDays } from 'date-fns'

export const getToday = (): Date => new Date(new Date().setHours(0, 0, 0, 0))

export const getTomorrow = (): Date => new Date(addDays(new Date(), 1).setHours(0, 0, 0, 0))
