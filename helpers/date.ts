import { addDays } from 'date-fns'

export const getTomorrow = (): Date => addDays(new Date(), 1)
