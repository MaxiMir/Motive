import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    title: formatMessage({ id: 'page.user.message-menu.title' }),
    editText: formatMessage({ id: 'common.edit' }),
    reportText: formatMessage({ id: 'common.report' }),
    cancelText: formatMessage({ id: 'common.cancel' }),
  }
}
