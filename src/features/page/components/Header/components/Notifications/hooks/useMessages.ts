import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    ariaControls: formatMessage({ id: 'component.notification.aria' }),
  }
}
