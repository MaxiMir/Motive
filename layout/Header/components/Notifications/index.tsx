import { MouseEvent, useState } from 'react'
import dynamic from 'next/dynamic'
import { Badge, Button } from '@mui/material'
import useLocale from 'hooks/useLocale'
import AppIcon from 'components/UI/AppIcon'
import { useNotifications } from './hook'
import { checkOnBadgeContent } from './helper'
import i18n from './i18n'

const NotificationsMenu = dynamic(() => import('./components/NotificationsMenu'))

export default function Notifications(): JSX.Element {
  const { locale } = useLocale()
  const { data = [] } = useNotifications()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const badgeContent = checkOnBadgeContent(data)
  const { ariaControls } = i18n[locale]

  const onOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const onClose = () => setAnchorEl(null)

  return (
    <>
      <Button
        aria-controls={anchorEl ? ariaControls : undefined}
        aria-haspopup="true"
        aria-expanded={anchorEl ? 'true' : undefined}
        sx={{ color: 'common.white' }}
        onClick={onOpen}
      >
        <Badge color="error" badgeContent={badgeContent} variant="dot" invisible={false}>
          <AppIcon name="notifications_none" />
        </Badge>
      </Button>
      {anchorEl && <NotificationsMenu notifications={data} anchorEl={anchorEl} onClose={onClose} />}
    </>
  )
}
