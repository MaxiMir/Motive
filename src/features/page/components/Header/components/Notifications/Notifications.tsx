import dynamic from 'next/dynamic'
import { Badge, IconButton } from '@mui/material'
import { useNotifications } from '@features/notification'
import useToggle from '@hooks/useToggle'
import AppIcon from '@ui/AppIcon'
import TooltipArrow from '@ui/styled/TooltipArrow'
import { useMessages } from './hooks/useMessages'
import { checkOnBadgeContent } from './helper'

const NotificationsModal = dynamic(() => import('./components/NotificationsModal'))

function Notifications() {
  const messages = useMessages()
  const { data = [] } = useNotifications()
  const [open, toggle] = useToggle()
  const badgeContent = checkOnBadgeContent(data)

  return (
    <>
      <TooltipArrow title={messages.title}>
        <IconButton
          aria-label={messages.title}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={toggle}
        >
          <Badge color="error" badgeContent={badgeContent} variant="dot" invisible={false}>
            <AppIcon name="notifications_none" />
          </Badge>
        </IconButton>
      </TooltipArrow>
      {open && <NotificationsModal notifications={data} onClose={toggle} />}
    </>
  )
}

export default Notifications
