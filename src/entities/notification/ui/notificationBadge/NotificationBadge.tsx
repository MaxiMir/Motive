import { Badge } from '@mui/material'
import { NotificationDto } from '@shared/api/dto'
import Icon from '@shared/ui/Icon'
import { getReadCount } from './lib/helpers/content'

interface NotificationBadgeProps {
  notifications: NotificationDto[]
}

export function NotificationBadge({ notifications }: NotificationBadgeProps) {
  const readCount = getReadCount(notifications)

  return (
    <Badge color="error" badgeContent={readCount} variant="dot" invisible={false}>
      <Icon name="notifications" />
    </Badge>
  )
}
