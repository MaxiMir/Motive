import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    header: formatMessage({ id: 'page.top.header' }),
    text: formatMessage({ id: 'page.top.dev' }),
  }
}
