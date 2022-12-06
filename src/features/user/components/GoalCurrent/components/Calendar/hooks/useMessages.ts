import { useIntl } from 'react-intl'

const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    inputFormat: formatMessage({ id: 'common.format' }),
  }
}

export default useMessages
