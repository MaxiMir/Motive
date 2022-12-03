import useDateFnsLocale from '@hooks/useDateFnsLocale'
import { getDistance } from '@utils/date'

const useDateDistance = () => {
  const fnsLocale = useDateFnsLocale()

  return (date: string) => getDistance(date, fnsLocale)
}

export default useDateDistance
