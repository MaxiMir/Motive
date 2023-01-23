import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    header: formatMessage({ id: 'page.feed.header' }),
    text: formatMessage({ id: 'common.dev' }),
  }
}
