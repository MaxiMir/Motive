import dynamic from 'next/dynamic'
import { backdropClasses, Box, Menu } from '@mui/material'
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
    <Menu
      anchorEl={anchorEl}
      open
      onClose={onClose}
      MenuListProps={{ 'aria-labelledby': 'notification-button' }}
      sx={{
        [`& .${backdropClasses.root}`]: {
          background: 'rgba(34, 34, 34, 0.75)',
          backdropFilter: 'blur(5px)',
        },
      }}
    >
      <Box py={2} width={340} height={400} overflow="scroll">
        {!notifications.length ? <EmptyList /> : <NotificationList notifications={notifications} onClose={onClose} />}
      </Box>
    </Menu>
  )
}
