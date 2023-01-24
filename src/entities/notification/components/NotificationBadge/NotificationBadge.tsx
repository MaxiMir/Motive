import { Badge } from '@mui/material'
import { NotificationDto } from '@entities/notification/dto'
import Icon from '@ui/Icon'
import { getReadCount } from './helpers/content'

interface NotificationBadgeProps {
  notifications: NotificationDto[]
}

function NotificationBadge({ notifications }: NotificationBadgeProps) {
  const readCount = getReadCount(notifications)

  return (
    <Badge color="error" badgeContent={readCount} variant="dot" invisible={false}>
      <Icon name="notifications" />
    </Badge>
  )
}

export default NotificationBadge
