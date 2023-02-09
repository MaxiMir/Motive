import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    title: formatMessage({ id: 'page.user.message-menu.title' }),
    copyText: formatMessage({ id: 'common.copy' }),
    copiedText: formatMessage({ id: 'common.copied' }),
    editText: formatMessage({ id: 'common.edit' }),
    reportText: formatMessage({ id: 'common.report' }),
    errorText: formatMessage({ id: 'common.error' }),
    cancelText: formatMessage({ id: 'common.cancel' }),
  }
}
