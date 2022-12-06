import { useIntl } from 'react-intl'

const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    header: formatMessage({ id: 'page.following.header' }),
  }
}

export default useMessages
