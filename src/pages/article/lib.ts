import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    shareText: formatMessage({ id: 'common.share' }),
    articlesText: formatMessage({ id: 'page.articles.header' }),
  }
}
