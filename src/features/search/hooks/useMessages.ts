import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    header: formatMessage({ id: 'page.search.header' }),
    trendText: formatMessage({ id: 'page.search.trend' }),
    userText: formatMessage({ id: 'page.search.user' }),
    goalText: formatMessage({ id: 'page.search.goal' }),
  }
}
