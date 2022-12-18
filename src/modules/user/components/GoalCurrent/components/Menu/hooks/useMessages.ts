import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    buttonTitle: formatMessage({ id: 'page.user.goal-current.open-menu' }),
    ariaControls: formatMessage({ id: 'page.user.goal-current.open-menu-area' }),
  }
}
