import { useIntl } from 'react-intl'

const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    title: formatMessage({ id: 'common.settings' }),
    modeHeader: formatMessage({ id: 'common.mode' }),
    languageHeader: formatMessage({ id: 'common.language' }),
    lightText: formatMessage({ id: 'common.light' }),
    systemText: formatMessage({ id: 'common.system' }),
    darkText: formatMessage({ id: 'common.dark' }),
  }
}

export default useMessages
