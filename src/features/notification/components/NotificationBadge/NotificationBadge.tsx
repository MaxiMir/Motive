import { Badge } from '@mui/material'
import { NotificationDto } from '@features/notification/dto'
import AppIcon from '@ui/AppIcon'
import { getReadCount } from './helpers/content'

interface NotificationBadgeProps {
  notifications: NotificationDto[]
}

function NotificationBadge({ notifications }: NotificationBadgeProps) {
  const readCount = getReadCount(notifications)

  return (
    <Badge color="error" badgeContent={readCount} variant="dot" invisible={false}>
      <AppIcon name="notifications" />
    </Badge>
  )
}

export default NotificationBadge
