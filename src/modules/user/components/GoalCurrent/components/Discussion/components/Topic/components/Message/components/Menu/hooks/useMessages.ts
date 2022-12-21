import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    title: formatMessage({ id: 'page.user.message-menu.title' }),
    ariaControls: formatMessage({ id: 'page.user.message-menu.aria' }),
  }
}
