import { IconButton } from '@mui/material'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { useNotifications, NotificationBadge } from 'entities/notification'
import { useViewer } from 'entities/viewer'
import { useToggle } from 'shared/lib/hooks'
import TooltipArrow from 'shared/ui/tooltip-arrow'

const ReadNotificationsModal = dynamic(() => import('features/notification/read-notifications'))

export function Notifications() {
  const viewer = useViewer()
  const { isLoading, data = [] } = useNotifications(viewer?.id)
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
      {open && (
        <ReadNotificationsModal notifications={data} isLoading={isLoading} onClose={toggle} />
      )}
    </>
  )
}

export default Notifications
