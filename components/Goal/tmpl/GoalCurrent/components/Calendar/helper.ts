import { format } from 'date-fns'

type DateInfo = {
  value: Date
  formattedValue: string
  prevValue: string
  nextValue: string
}

export const getDateInfo = (dates: string[], date: string): DateInfo => {
  const value = new Date(date)
  const formattedValue = getDateKey(value)
  const valueIndex = dates.findIndex((d) => d === formattedValue)
  const prevValue = dates[valueIndex - 1]
  const nextValue = dates[valueIndex + 1]

  return {
    value,
    formattedValue,
    prevValue,
    nextValue,
  }
}

export const getDateKey = (date: string | Date): string =>
  format(date instanceof Date ? date : new Date(date), 'dd.MM.yyyy')
