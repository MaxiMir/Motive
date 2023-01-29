import { IconButton } from '@mui/material'
import dynamic from 'next/dynamic'
import { useNotifications, NotificationBadge } from 'entities/notification'
import { useMessage, useToggle } from 'shared/lib/hooks'
import { TooltipArrow } from 'shared/ui/styled'

const NotificationModal = dynamic(() =>
  import('entities/notification').then((m) => m.NotificationModal),
)

export function Notifications() {
  const title = useMessage('component.notification.title')
  const { isLoading, data = [] } = useNotifications()
  const [open, toggle] = useToggle()

  return (
    <>
      <TooltipArrow title={title}>
        <IconButton aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={toggle}>
          <NotificationBadge notifications={data} />
        </IconButton>
      </TooltipArrow>
      {open && <NotificationModal notifications={data} isLoading={isLoading} onClose={toggle} />}
    </>
  )
}

export default Notifications
