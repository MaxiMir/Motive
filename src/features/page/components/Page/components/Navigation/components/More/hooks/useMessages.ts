import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    moreText: formatMessage({ id: 'common.more' }),
    switchMode: formatMessage({ id: 'common.switch-mode' }),
    languageText: formatMessage({ id: 'common.language' }),
    logOut: formatMessage({ id: 'common.log-out' }),
    cancelText: formatMessage({ id: 'common.cancel' }),
  }
}
