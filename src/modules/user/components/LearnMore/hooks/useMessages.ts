import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    info: formatMessage({ id: 'common.info' }),
  }
}
