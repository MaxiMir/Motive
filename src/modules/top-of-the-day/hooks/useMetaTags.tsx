import { useIntl } from 'react-intl'

export const useMetaTags = () => {
  const { formatMessage } = useIntl()

  return {
    title: formatMessage({ id: 'page.top.title' }),
  }
}
