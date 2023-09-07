import { Divider, Stack } from '@mui/material'
import { Fragment } from 'react'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { useDetectMobile } from 'entities/device'
import { NotificationDto } from 'shared/api'
import Modal from 'shared/ui/Modal'
import { useNotificationHint } from './lib'

const Loader = dynamic(() => import('./loader'))
const Hint = dynamic(() => import('./hint'))
const EmptyList = dynamic(() => import('./emptyList'))
const NotificationCard = dynamic(() => import('./notificationCard'))

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
  const mobile = useDetectMobile()
  const title = formatMessage({ id: 'common.notifications' })
  const [showHint, onHintClick] = useNotificationHint()
  const lastId = notifications.at(-1)?.id

  return (
    <Modal title={title} maxWidth="xs" contentHeight={600} fullScreen={mobile} onClose={onClose}>
      <Stack flex={1}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {showHint && <Hint onClick={onHintClick} />}
            {!notifications.length ? (
              <EmptyList />
            ) : (
              <Stack flex={1} gap={2}>
                {notifications.map((notification) => (
                  <Fragment key={notification.id}>
                    <NotificationCard
                      notification={notification}
                      key={notification.id}
                      onClose={onClose}
                    />
                    {lastId !== notification.id && <Divider light />}
                  </Fragment>
                ))}
              </Stack>
            )}
          </>
        )}
      </Stack>
    </Modal>
  )
}

export default ReadNotificationsModal
