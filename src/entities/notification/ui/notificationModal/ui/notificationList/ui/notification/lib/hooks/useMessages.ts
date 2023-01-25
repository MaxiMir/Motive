import { useIntl } from 'react-intl'
import { NotificationType } from '@shared/api/notification'

export const useMessages = (type: NotificationType) => {
  const { formatMessage } = useIntl()

  return {
    header: formatMessage({ id: `component.notification.${type}` }),
    viewTitle: formatMessage({ id: 'common.view' }),
  }
}
