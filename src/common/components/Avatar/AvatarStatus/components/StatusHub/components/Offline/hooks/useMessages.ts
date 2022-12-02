import { useIntl } from 'react-intl'

const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    agoText: formatMessage({ id: 'common.ago' }),
    seenText: formatMessage({ id: 'common.seen' }),
  }
}

export default useMessages
