import { MuiPickersAdapterContext } from '@mui/x-date-pickers'
import { differenceInCalendarDays, formatDistance } from 'date-fns'
import { useContext } from 'react'
import { useFormatDate } from './use-format-Date'

export function useFormatDistance() {
  const formatDate = useFormatDate()
  const ctx = useContext(MuiPickersAdapterContext)

  return (value: string) => {
    const today = new Date()
    const date = new Date(value)
    const moreThenTwoDays = differenceInCalendarDays(today, date) > 2

    return moreThenTwoDays
      ? formatDate(value, { day: 'numeric', month: 'short', hour: 'numeric', minute: 'numeric' })
      : formatDistance(new Date(date), today, { addSuffix: true, locale: ctx?.utils.locale })
  }
}
