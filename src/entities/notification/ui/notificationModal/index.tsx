import { Stack } from '@mui/material'
import dynamic from 'next/dynamic'
import { NotificationDto } from 'shared/api'
import { useMessage } from 'shared/lib/hooks'
import Modal from 'shared/ui/Modal'
import { useNotificationHint } from './lib'

const Loader = dynamic(() => import('./loader'))
const Hint = dynamic(() => import('./hint'))
const EmptyList = dynamic(() => import('./emptyList'))
const NotificationList = dynamic(() => import('./notificationList'))

interface NotificationModalProps {
  notifications: NotificationDto[]
  isLoading: boolean
  onClose: () => void
}

export function NotificationModal({ notifications, isLoading, onClose }: NotificationModalProps) {
  const title = useMessage('common.notifications')
  const [showHint, onHintClick] = useNotificationHint()

  return (
    <Modal
      title={title}
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
