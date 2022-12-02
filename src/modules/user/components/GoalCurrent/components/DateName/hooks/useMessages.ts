import { useIntl } from 'react-intl'
import { getIntlKey } from '@utils/date'

const useMessages = (dayDifference: number) => {
  const { formatMessage } = useIntl()
  const intlKey = getIntlKey(dayDifference)

  return {
    name: intlKey && formatMessage({ id: `common.${intlKey}` }),
  }
}

export default useMessages
