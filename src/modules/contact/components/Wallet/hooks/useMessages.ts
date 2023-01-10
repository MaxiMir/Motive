import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    copyText: formatMessage({ id: 'common.copy' }),
    copiedText: formatMessage({ id: 'common.copied' }),
    errorText: formatMessage({ id: 'common.error' }),
  }
}
