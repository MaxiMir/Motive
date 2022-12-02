import dynamic from 'next/dynamic'
import { useIntl } from 'react-intl'
import { Box } from '@mui/material'
import { NotificationDto } from '@dto'
import AppModal from '@ui/AppModal/AppModal'
import useNotificationHint from './hooks/useNotificationHint'

const EmptyList = dynamic(() => import('./components/EmptyList'))
const NotificationList = dynamic(() => import('./components/NotificationList'))
const Hint = dynamic(() => import('./components/Hint/Hint'))

interface ModalNotificationsProps {
  notifications: NotificationDto[]
  onClose: () => void
}

function ModalNotifications({ notifications, onClose }: ModalNotificationsProps) {
  const { formatMessage } = useIntl()
  const [showHint, onHintClick] = useNotificationHint()
  const title = formatMessage({ id: 'common.notifications' })
  const alignItems = !notifications.length ? 'center' : undefined

  return (
    <AppModal title={title} maxWidth="xs" onClose={onClose}>
      {showHint && <Hint onClick={onHintClick} />}
      <Box display="flex" alignItems={alignItems} minHeight={400} flex={1}>
        {!notifications.length ? <EmptyList /> : <NotificationList notifications={notifications} onClose={onClose} />}
      </Box>
    </AppModal>
  )
}

export default ModalNotifications
