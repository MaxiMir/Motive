import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    title: formatMessage({ id: 'common.no-results' }),
    description: formatMessage({ id: 'common.no-results-description' }),
  }
}
