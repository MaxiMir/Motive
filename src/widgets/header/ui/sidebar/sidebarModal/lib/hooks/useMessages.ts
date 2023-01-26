import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    logOut: formatMessage({ id: 'common.log-out' }),
    settings: formatMessage({ id: 'common.settings' }),
    closeText: formatMessage({ id: 'common.close' }),
  }
}
