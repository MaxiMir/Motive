import { useContext } from 'react'
import { MuiPickersAdapterContext } from '@mui/x-date-pickers'
import { formatDistance } from 'date-fns'

const useFormatDistance = () => {
  const ctx = useContext(MuiPickersAdapterContext)
  const locale = ctx?.utils.locale

  return (date: string, baseDate = new Date()) => {
    return formatDistance(new Date(date), baseDate, { addSuffix: true, locale })
  }
}

export default useFormatDistance
