import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    title: formatMessage({ id: 'common.settings' }),
    modeHeader: formatMessage({ id: 'common.mode' }),
    languageHeader: formatMessage({ id: 'common.language' }),
    lightText: formatMessage({ id: 'common.light' }),
    darkText: formatMessage({ id: 'common.dark' }),
  }
}
