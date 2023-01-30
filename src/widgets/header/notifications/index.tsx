import { IconButton } from '@mui/material'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { useNotifications, NotificationBadge } from 'entities/notification'
import { useToggle } from 'shared/lib/hooks'
import TooltipArrow from 'shared/ui/TooltipArrow'

const NotificationModal = dynamic(() =>
  import('entities/notification').then((m) => m.NotificationModal),
)

export function Notifications() {
  const { isLoading, data = [] } = useNotifications()
  const { formatMessage } = useIntl()
  const [open, toggle] = useToggle()
  const title = formatMessage({ id: 'component.notification.title' })

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
