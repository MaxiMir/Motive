import { useIntl } from 'react-intl'

const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    title: formatMessage({ id: 'common.editing' }),
    subtitle: formatMessage({ id: 'common.message' }),
    buttonText: formatMessage({ id: 'common.save' }),
    loadingText: formatMessage({ id: 'common.saving' }),
    label: formatMessage({ id: 'common.your-message' }),
  }
}

export default useMessages
