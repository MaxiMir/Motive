import { Stack } from '@mui/material'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { NotificationDto } from 'shared/api'
import Modal from 'shared/ui/Modal'
import { useNotificationHint } from './lib'

const Loader = dynamic(() => import('./loader'))
const Hint = dynamic(() => import('./hint'))
const EmptyList = dynamic(() => import('./emptyList'))
const NotificationList = dynamic(() => import('./notificationList'))

interface ReadNotificationsModalProps {
  notifications: NotificationDto[]
  isLoading: boolean
  onClose: () => void
}

function ReadNotificationsModal({
  notifications,
  isLoading,
  onClose,
}: ReadNotificationsModalProps) {
  const { formatMessage } = useIntl()
  const title = formatMessage({ id: 'common.notifications' })
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

export default ReadNotificationsModal
