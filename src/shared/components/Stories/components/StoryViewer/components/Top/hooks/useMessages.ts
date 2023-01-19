import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    close: formatMessage({ id: 'common.close' }),
  }
}
