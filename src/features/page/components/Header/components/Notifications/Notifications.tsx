import dynamic from 'next/dynamic'
import { Badge, Button } from '@mui/material'
import { useNotifications } from '@features/notification'
import useToggle from '@hooks/useToggle'
import AppIcon from '@ui/AppIcon'
import { useMessages } from './hooks/useMessages'
import { checkOnBadgeContent } from './helper'

const ModalNotifications = dynamic(() => import('./components/ModalNotifications'))

function Notifications() {
  const messages = useMessages()
  const { data = [] } = useNotifications()
  const [open, toggle] = useToggle()
  const badgeContent = checkOnBadgeContent(data)

  return (
    <>
      <Button
        aria-controls={open ? messages.ariaControls : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        sx={{ color: 'common.white' }}
        onClick={toggle}
      >
        <Badge color="error" badgeContent={badgeContent} variant="dot" invisible={false}>
          <AppIcon name="notifications_none" />
        </Badge>
      </Button>
      {open && <ModalNotifications notifications={data} onClose={toggle} />}
    </>
  )
}

export default Notifications
