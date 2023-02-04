import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    header: formatMessage({ id: 'common.offline' }),
    description: formatMessage({ id: 'common-check-connection' }),
    reloadText: formatMessage({ id: 'common.reload' }),
  }
}
