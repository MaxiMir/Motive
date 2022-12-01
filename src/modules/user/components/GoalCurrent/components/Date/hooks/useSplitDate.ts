import { useIntl } from 'react-intl'
import { dateFormatter } from '@helpers/intl'

const useSplitDate = (date: string) => {
  const { locale } = useIntl()
  const shownDate = dateFormatter(date, locale, { day: 'numeric', month: 'long' })

  return shownDate.split(' ')
}

export default useSplitDate
