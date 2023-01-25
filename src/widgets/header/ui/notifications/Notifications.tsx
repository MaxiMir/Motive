import { IconButton } from '@mui/material'
import dynamic from 'next/dynamic'
import { useNotifications, NotificationBadge } from '@entities/notification'
import { useToggle } from '@shared/lib/hooks'
import TooltipArrow from '@shared/ui/styled/TooltipArrow'
import { useMessages } from './lib/hooks/useMessages'

const NotificationModal = dynamic(() => import('@entities/notification'))

function Notifications() {
  const messages = useMessages()
  const { isLoading, data = [] } = useNotifications()
  const [open, toggle] = useToggle()

  return (
    <>
      <TooltipArrow title={messages.title}>
        <IconButton aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={toggle}>
          <NotificationBadge notifications={data} />
        </IconButton>
      </TooltipArrow>
      {open && <NotificationModal notifications={data} isLoading={isLoading} onClose={toggle} />}
    </>
  )
}

export default Notifications