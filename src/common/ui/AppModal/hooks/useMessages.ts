import { useIntl } from 'react-intl'

const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    label: formatMessage({ id: 'common.close' }),
  }
}

export default useMessages
