import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    shareTitle: formatMessage({ id: 'common.share' }),
    copiedText: formatMessage({ id: 'common.copied' }),
    error: formatMessage({ id: 'common.error' }),
    shareText: formatMessage({ id: 'component.share.share' }),
    sendText: formatMessage({ id: 'component.share.send' }),
    copyText: formatMessage({ id: 'component.share.copy' }),
    closeText: formatMessage({ id: 'common.close' }),
  }
}
