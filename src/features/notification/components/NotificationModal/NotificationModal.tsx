import dynamic from 'next/dynamic'
import { Box } from '@mui/material'
import { NotificationDto } from '@features/notification'
import AppModal from '@ui/AppModal'
import { paperClasses } from '@mui/material/Paper'
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
  const alignItems = !notifications.length ? 'center' : undefined

  return (
    <AppModal
      title={messages.title}
      maxWidth="xs"
      sx={{
        [`& .${paperClasses.root}`]: {
          height: 600,
        },
      }}
      onClose={onClose}
    >
      <Box display="flex" alignItems={alignItems} flex={1}>
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
      </Box>
    </AppModal>
  )
}

export default NotificationModal