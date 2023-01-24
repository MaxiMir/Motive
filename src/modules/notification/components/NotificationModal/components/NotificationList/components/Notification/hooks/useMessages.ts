import { useIntl } from 'react-intl'
import { NotificationType } from '@modules/notification/dto'

export const useMessages = (type: NotificationType) => {
  const { formatMessage } = useIntl()

  return {
    header: formatMessage({ id: `component.notification.${type}` }),
    viewTitle: formatMessage({ id: 'common.view' }),
  }
}
