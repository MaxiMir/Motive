import { MouseEvent, useId, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { Menu, MenuItem } from '@mui/material'
import { useCheckOnClientPage, useUserContext } from '@modules/user/hooks'
import { share } from '@helpers/navigator'
import AppIcon from '@ui/AppIcon'
import GreyButton from '@ui/styled/GreyButton'
import useToggle from '@hooks/useToggle'
import AppListItem from '@ui/AppListItem'
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

  const onOpenMenu = (e: MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget)

  const onCloseMenu = () => setAnchorEl(null)

  const onShare = async () => {
    onCloseMenu()
    await share(asPath, name, toggleSharing)
  }

  const onCloseReport = () => {
    onCloseMenu()
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
        onClick={onOpenMenu}
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
        onClose={onCloseMenu}
      >
        <MenuItem onClick={onShare}>
          <AppListItem icon="share" primary={messages.shareText} />
        </MenuItem>
        {!clientPage && (
          <MenuItem onClick={toggleReporting}>
            <AppListItem icon="outlined_flag" primary={messages.reportText} color="error.dark" />
          </MenuItem>
        )}
        <MenuItem onClick={onCloseMenu}>
          <AppListItem icon="block" primary={messages.cancelText} color="grey" />
        </MenuItem>
      </Menu>
      {reporting && <Report id={userId} type="user" anchorEl={anchorEl} onClose={onCloseReport} />}
      {sharing && <Share href={asPath} title={name} onClose={toggleSharing} />}
    </>
  )
}

export default MenuActions
