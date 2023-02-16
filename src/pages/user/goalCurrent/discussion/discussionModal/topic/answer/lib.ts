import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    cancelText: formatMessage({ id: 'common.cancel' }),
    enterText: formatMessage({ id: 'common.enter-to-send' }),
  }
}
