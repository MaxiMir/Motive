import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    title: formatMessage({ id: 'page.following.menu.title' }),
    shareText: formatMessage({ id: 'common.share' }),
    removeText: formatMessage({ id: 'common.remove' }),
    cancelText: formatMessage({ id: 'common.cancel' }),
  }
}
