import dynamic from 'next/dynamic'
import { useIntl } from 'react-intl'
import { Box } from '@mui/material'
import { NotificationDto } from '@dto'
import AppModal from '@ui/AppModal'
import useNotificationHint from './hook'
import i18n from './i18n'

const EmptyList = dynamic(() => import('./components/EmptyList'))
const NotificationList = dynamic(() => import('./components/NotificationList'))
const Hint = dynamic(() => import('./components/Hint'))

interface ModalNotificationsProps {
  notifications: NotificationDto[]
  onClose: () => void
}

export default function ModalNotifications({ notifications, onClose }: ModalNotificationsProps) {
  const { locale } = useIntl()
  const [showHint, onHintClick] = useNotificationHint()
  const { title } = i18n[locale]

  return (
    <AppModal title={title} maxWidth="xs" onClose={onClose}>
      {showHint && <Hint locale={locale} onClick={onHintClick} />}
      <Box display="flex" alignItems={!notifications.length ? 'center' : undefined} minHeight={400} flex={1}>
        {!notifications.length ? <EmptyList /> : <NotificationList notifications={notifications} onClose={onClose} />}
      </Box>
    </AppModal>
  )
}
