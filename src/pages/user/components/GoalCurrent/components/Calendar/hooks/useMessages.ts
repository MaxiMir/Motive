import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    inputFormat: formatMessage({ id: 'common.format' }),
  }
}
