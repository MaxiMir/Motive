import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    title: formatMessage({ id: 'common.supporting' }),
    header: formatMessage({ id: 'common.about-support' }),
    buttonText: formatMessage({ id: 'common.supporting' }),
    label: formatMessage({ id: 'common.your-message' }),
    loadingText: formatMessage({ id: 'common.sending' }),
  }
}
