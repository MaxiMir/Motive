import { useIntl } from 'react-intl'

const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    seenText: formatMessage({ id: 'common.seen' }),
  }
}

export default useMessages
