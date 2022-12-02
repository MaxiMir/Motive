import { useIntl } from 'react-intl'

const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    buttonText: formatMessage({ id: 'common.cancel' }),
  }
}

export default useMessages
