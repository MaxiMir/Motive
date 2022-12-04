import { useIntl } from 'react-intl'
import { NotificationType } from '@dto'

const useMessages = (type: NotificationType) => {
  const { formatMessage } = useIntl()

  return {
    header: formatMessage({ id: `component.notification.${type}` }),
    viewTitle: formatMessage({ id: 'common.view' }),
  }
}

export default useMessages
