import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    shareText: formatMessage({ id: 'common.share' }),
    removeText: formatMessage({ id: 'common.remove' }),
  }
}
