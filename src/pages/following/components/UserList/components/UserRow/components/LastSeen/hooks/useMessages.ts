import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    seenText: formatMessage({ id: 'common.seen' }),
  }
}
