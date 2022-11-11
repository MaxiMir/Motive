import { useContext } from 'react'
import { MuiPickersAdapterContext } from '@mui/x-date-pickers'

export const useDateFnsLocale = () => {
  const ctx = useContext(MuiPickersAdapterContext)

  return ctx?.utils.locale
}
