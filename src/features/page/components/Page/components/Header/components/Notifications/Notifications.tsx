import dynamic from 'next/dynamic'
import { IconButton } from '@mui/material'
import { useNotifications, NotificationBadge } from '@features/notification'
import useToggle from '@hooks/useToggle'
import TooltipArrow from '@ui/styled/TooltipArrow'
import { useMessages } from './hooks/useMessages'

const NotificationModal = dynamic(() => import('@features/notification'))

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
