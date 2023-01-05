import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    logOut: formatMessage({ id: 'common.log-out' }),
    settings: formatMessage({ id: 'common.settings' }),
    news: formatMessage({ id: 'common.articles' }),
    features: formatMessage({ id: 'common.features' }),
    contact: formatMessage({ id: 'common.contact' }),
    closeText: formatMessage({ id: 'common.close' }),
  }
}
