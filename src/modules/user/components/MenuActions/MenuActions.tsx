import { MouseEvent, useId, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { Menu } from '@mui/material'
import { useCheckOnClientPage, useUserContext } from '@modules/user/hooks'
import AppIcon from '@ui/AppIcon'
import GreyButton from '@ui/styled/GreyButton'
import useToggle from '@hooks/useToggle'
import AppMenuItem from '@ui/AppMenuItem'
import { useMessages } from './hooks/useMessages'

const Share = dynamic(() => import('@components/Share'))
const Report = dynamic(() => import('@features/report'))

function MenuActions() {
  const id = useId()
  const menuId = useId()
  const { asPath } = useRouter()
  const { id: userId, name } = useUserContext()
  const clientPage = useCheckOnClientPage(userId)
  const messages = useMessages(!clientPage)
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [reporting, toggleReporting] = useToggle()
  const [sharing, toggleSharing] = useToggle()
  const open = Boolean(anchorEl)

  const onOpen = (e: MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget)

  const onClose = () => setAnchorEl(null)

  const onShare = () => {
    onClose()
    toggleSharing()
  }

  const onCloseReport = () => {
    onClose()
    toggleReporting()
  }

  return (
    <>
      <GreyButton
        id={id}
        size="small"
        endIcon={<AppIcon name="expand_more" />}
        aria-controls={open ? menuId : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        sx={{
          minWidth: '96px',
          height: 30,
          paddingX: 1,
        }}
        onClick={onOpen}
      >
        {messages.title}
      </GreyButton>
      <Menu
        id={menuId}
        anchorEl={anchorEl}
        open={open}
        MenuListProps={{
          'aria-labelledby': id,
        }}
        onClose={onClose}
      >
        <AppMenuItem icon="share" text={messages.shareText} onClick={onShare} />
        {!clientPage && (
          <AppMenuItem
            icon="outlined_flag"
            text={messages.reportText}
            color="error.dark"
            onClick={toggleReporting}
          />
        )}
        <AppMenuItem icon="block" text={messages.cancelText} color="grey" onClick={onClose} />
      </Menu>
      {reporting && <Report id={userId} type="user" anchorEl={anchorEl} onClose={onCloseReport} />}
      {sharing && <Share title={name} href={asPath} onClose={toggleSharing} />}
    </>
  )
}

export default MenuActions
