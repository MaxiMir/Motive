import { Badge } from '@mui/material'
import { NotificationDto } from 'shared/api'
import Icon from 'shared/ui/Icon'
import { getReadCount } from './lib'

interface NotificationBadgeProps {
  notifications: NotificationDto[]
  color?: string
}

export function NotificationBadge({ notifications, color }: NotificationBadgeProps) {
  const readCount = getReadCount(notifications)

  return (
    <Badge color="error" badgeContent={readCount} variant="dot" invisible={false}>
      <Icon name="notifications" color={color} />
    </Badge>
  )
}
