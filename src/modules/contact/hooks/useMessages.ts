import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    header: formatMessage({ id: 'page.contact.header' }),
    subheader: formatMessage({ id: 'page.contact.subheader' }),
    support: formatMessage({ id: 'page.contact.support' }),
  }
}
