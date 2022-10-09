import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Badge, Button } from '@mui/material'
import useLocale from 'hooks/useLocale'
import AppIcon from 'components/ui/AppIcon'
import { useNotifications } from './hook'
import { checkOnBadgeContent } from './helper'
import i18n from './i18n'

const ModalNotifications = dynamic(() => import('./components/ModalNotifications'))

export default function Notifications() {
  const { locale } = useLocale()
  const { data = [] } = useNotifications()
  const [open, setOpen] = useState(false)
  const badgeContent = checkOnBadgeContent(data)
  const { ariaControls } = i18n[locale]

  const toggleModal = () => setOpen(!open)

  return (
    <>
      <Button
        aria-controls={open ? ariaControls : undefined}
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
