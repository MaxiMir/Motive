import dynamic from 'next/dynamic'
import { Stack } from '@mui/material'
import { NotificationDto } from '@entities/notification'
import Modal from '@ui/Modal'
import { useMessages } from './hooks/useMessages'
import { useNotificationHint } from './hooks/useNotificationHint'

const Loader = dynamic(() => import('./components/Loader'))
const Hint = dynamic(() => import('./components/Hint'))
const EmptyList = dynamic(() => import('./components/EmptyList'))
const NotificationList = dynamic(() => import('./components/NotificationList'))

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
