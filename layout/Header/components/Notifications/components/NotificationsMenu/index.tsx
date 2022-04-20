import dynamic from 'next/dynamic'
import { Box, Menu } from '@mui/material'
import { NotificationDto } from 'dto'

const EmptyList = dynamic(() => import('./components/EmptyList'))
const NotificationList = dynamic(() => import('./components/NotificationList'))

interface NotificationsMenuProps {
  notifications: NotificationDto[]
  anchorEl: HTMLElement
  onClose: () => void
}

export default function NotificationsMenu({ notifications, anchorEl, onClose }: NotificationsMenuProps): JSX.Element {
  return (
    <Menu anchorEl={anchorEl} open onClose={onClose} MenuListProps={{ 'aria-labelledby': 'notification-button' }}>
      <Box py={2} width={300} height={350} overflow="scroll">
        {!notifications.length ? <EmptyList /> : <NotificationList notifications={notifications} />}
      </Box>
    </Menu>
  )
}
