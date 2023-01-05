import dynamic from 'next/dynamic'
import { Box } from '@mui/material'
import { NotificationDto } from '@features/notification'
import AppModal from '@ui/AppModal'
import { useMessages } from './hooks/useMessages'
import { useNotificationHint } from './hooks/useNotificationHint'

const EmptyList = dynamic(() => import('./components/EmptyList/EmptyList'))
const NotificationList = dynamic(() => import('./components/NotificationList'))
const Hint = dynamic(() => import('./components/Hint/Hint'))

interface NotificationsModalProps {
  notifications: NotificationDto[]
  onClose: () => void
}

function NotificationsModal({ notifications, onClose }: NotificationsModalProps) {
  const messages = useMessages()
  const [showHint, onHintClick] = useNotificationHint()
  const alignItems = !notifications.length ? 'center' : undefined

  return (
    <AppModal title={messages.title} maxWidth="xs" onClose={onClose}>
      {showHint && <Hint onClick={onHintClick} />}
      <Box display="flex" alignItems={alignItems} minHeight={400} flex={1}>
        {!notifications.length ? (
          <EmptyList />
        ) : (
          <NotificationList notifications={notifications} onClose={onClose} />
        )}
      </Box>
    </AppModal>
  )
}

export default NotificationsModal
