import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Badge, Button } from '@mui/material'
import { useNotifications } from '@features/notification'
import AppIcon from '@ui/AppIcon'
import { useMessages } from './hooks/useMessages'
import { checkOnBadgeContent } from './helper'

const ModalNotifications = dynamic(() => import('./components/ModalNotifications'))

function Notifications() {
  const messages = useMessages()
  const { data = [] } = useNotifications()
  const [open, setOpen] = useState(false)
  const badgeContent = checkOnBadgeContent(data)

  const toggleModal = () => setOpen(!open)

  return (
    <>
      <Button
        aria-controls={open ? messages.ariaControls : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        sx={{ color: 'common.white' }}
        onClick={toggleModal}
      >
        <Badge color="error" badgeContent={badgeContent} variant="dot" invisible={false}>
          <AppIcon name="notifications_none" />
        </Badge>
      </Button>
      {open && <ModalNotifications notifications={data} onClose={toggleModal} />}
    </>
  )
}

export default Notifications
