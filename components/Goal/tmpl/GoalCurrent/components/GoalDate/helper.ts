import { format } from 'date-fns'

export const getDateInfo = (
  dates: string[],
  date: string,
): { value: Date; formattedValue: string; prevValue: string; nextValue: string } => {
  const value = new Date(date)
  const formattedValue = format(value, 'MM/dd/yy')
  const valueIndex = dates.findIndex((d) => d === value.toISOString())
  const prevValue = dates[valueIndex - 1]
  const nextValue = dates[valueIndex + 1]

  return {
    value,
    formattedValue,
    prevValue,
    nextValue,
  }
}
