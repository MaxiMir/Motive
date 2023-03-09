import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    header: formatMessage({ id: 'page.contact.header' }),
    content: formatMessage({ id: 'page.contact.content' }),
  }
}
