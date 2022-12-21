import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    copyText: formatMessage({ id: 'common.copied' }),
    error: formatMessage({ id: 'common.error' }),
  }
}
