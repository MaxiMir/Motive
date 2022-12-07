import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    shareText: formatMessage({ id: 'component.share.share' }),
    sendText: formatMessage({ id: 'component.share.send' }),
    copyText: formatMessage({ id: 'component.share.copy' }),
  }
}
