import { useContext } from 'react'
import { Locale } from 'date-fns'
import { MuiPickersAdapterContext } from '@mui/x-date-pickers'

const useDateFnsLocale = (): Locale => {
  const ctx = useContext(MuiPickersAdapterContext)

  return ctx?.utils.locale
}

export default useDateFnsLocale
