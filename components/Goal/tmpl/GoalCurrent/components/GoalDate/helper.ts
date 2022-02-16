import { format } from 'date-fns'

export const FORMAT = 'dd.MM.yyyy'

type DateInfo = {
  value: Date
  formattedValue: string
  prevValue: string
  nextValue: string
}

export const getDateInfo = (dates: string[], date: string): DateInfo => {
  const value = new Date(date)
  const formattedValue = format(value, FORMAT)
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
