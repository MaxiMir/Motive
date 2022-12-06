import { useIntl } from 'react-intl'

const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    subheader: formatMessage({ id: 'page.home.subheader' }),
  }
}

export default useMessages
