import { IconButton } from '@mui/material'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { useNotifications, NotificationBadge } from '@entities/notification'
import { useToggle } from '@shared/lib/hooks'
import { TooltipArrow } from '@shared/ui/styled'

const NotificationModal = dynamic(() => import('@entities/notification'))

export function Notifications() {
  const { formatMessage } = useIntl()
  const { isLoading, data = [] } = useNotifications()
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
