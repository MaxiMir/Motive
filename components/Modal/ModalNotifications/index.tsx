import dynamic from 'next/dynamic'
import { Box } from '@mui/material'
import { NotificationDto } from 'dto'
import useLocale from 'hooks/useLocale'
import AppModal from 'components/UI/AppModal'
import i18n from './i18n'

const EmptyList = dynamic(() => import('./components/EmptyList'))
const NotificationList = dynamic(() => import('./components/NotificationList'))

interface ModalNotificationsProps {
  notifications: NotificationDto[]
  onClose: () => void
}

export default function ModalNotifications({ notifications, onClose }: ModalNotificationsProps) {
  const { locale } = useLocale()
  const { title } = i18n[locale]

  return (
    <AppModal title={title} maxWidth="xs" onClose={onClose}>
      <Box display="flex" alignItems={!notifications.length ? 'center' : undefined} minHeight={400} flex={1}>
        {!notifications.length ? <EmptyList /> : <NotificationList notifications={notifications} onClose={onClose} />}
      </Box>
    </AppModal>
  )
}
