import { Stack } from '@mui/material'
import dynamic from 'next/dynamic'
import { NotificationDto } from '@shared/api/notification'
import Modal from '@shared/ui/Modal'
import { useMessages } from './lib/hooks/useMessages'
import { useNotificationHint } from './lib/hooks/useNotificationHint'

const Loader = dynamic(() => import('./ui/Loader'))
const Hint = dynamic(() => import('./ui/hint/Hint'))
const EmptyList = dynamic(() => import('./ui/emptyList/EmptyList'))
const NotificationList = dynamic(() => import('./ui/notificationList/NotificationList'))

interface NotificationModalProps {
  notifications: NotificationDto[]
  isLoading: boolean
  onClose: () => void
}

function NotificationModal({ notifications, isLoading, onClose }: NotificationModalProps) {
  const messages = useMessages()
  const [showHint, onHintClick] = useNotificationHint()

  return (
    <Modal
      title={messages.title}
      maxWidth="xs"
      PaperProps={{
        sx: {
          height: 600,
        },
      }}
      onClose={onClose}
    >
      <Stack flex={1}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {showHint && <Hint onClick={onHintClick} />}
            {!notifications.length ? (
              <EmptyList />
            ) : (
              <NotificationList notifications={notifications} onClose={onClose} />
            )}
          </>
        )}
      </Stack>
    </Modal>
  )
}

export default NotificationModal
