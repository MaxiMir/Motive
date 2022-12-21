import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    title: formatMessage({ id: 'page.following.menu.title' }),
    ariaControls: formatMessage({ id: 'page.following.menu.aria' }),
  }
}
