import { useIntl } from 'react-intl'

const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    header: formatMessage({ id: 'page.contact.header' }),
    subheader: formatMessage({ id: 'page.contact.subheader' }),
    support: formatMessage({ id: 'page.contact.support' }),
  }
}

export default useMessages
