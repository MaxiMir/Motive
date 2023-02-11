import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    title: formatMessage({ id: 'common.editing-message' }),
    buttonText: formatMessage({ id: 'common.save' }),
    loadingText: formatMessage({ id: 'common.saving' }),
    label: formatMessage({ id: 'common.your-message' }),
  }
}
