import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    sendText: formatMessage({ id: 'common.send' }),
    placeholder: formatMessage({ id: 'common.message' }),
  }
}
