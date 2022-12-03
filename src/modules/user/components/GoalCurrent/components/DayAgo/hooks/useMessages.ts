import { useIntl } from 'react-intl'
import { getIntlDayId } from '@utils/date'

const useMessages = (dayDifference: number) => {
  const { formatMessage } = useIntl()
  const id = getIntlDayId(dayDifference)

  return {
    name: id && formatMessage({ id }),
    ago: formatMessage({ id: 'common.ago' }),
  }
}

export default useMessages
