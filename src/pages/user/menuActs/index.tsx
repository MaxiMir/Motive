import { Menu, MenuItem } from '@mui/material'
import { MouseEvent, useId, useState } from 'react'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { tryNativeShare } from 'features/share'
import { useUserContext } from 'entities/user'
import { useToggle } from 'shared/lib/hooks'
import { GreyButton } from 'shared/ui/GreyButton'
import Icon from 'shared/ui/Icon'
import ListItem from 'shared/ui/ListItem'

const Share = dynamic(() => import('features/share'))
const CreateReport = dynamic(() => import('features/report/create-report'))

interface MenuActsProps {
  viewerPage: boolean
}

function MenuActs({ viewerPage }: MenuActsProps) {
  const id = useId()
  const menuId = useId()
  const { asPath } = useRouter()
  const { id: userId, name } = useUserContext()
  const { formatMessage } = useIntl()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [reporting, toggleReporting] = useToggle()
  const [sharing, toggleSharing] = useToggle()
  const open = Boolean(anchorEl)
  const title = formatMessage({ id: 'common.more' })
  const shareText = formatMessage({ id: 'common.share' })
  const reportText = formatMessage({ id: 'common.report' })
  const cancelText = formatMessage({ id: 'common.cancel' })

  const onOpenMenu = (e: MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget)

  const onCloseMenu = () => setAnchorEl(null)

  const onShare = async () => {
    onCloseMenu()
    await tryNativeShare(asPath, name, toggleSharing)
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
        endIcon={<Icon name="expand_more" />}
        aria-controls={open ? menuId : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        sx={{
          flex: {
            xs: 1,
            lg: 'initial',
          },
          minWidth: '96px',
          height: 30,
          paddingX: 1,
        }}
        onClick={onOpenMenu}
      >
        {title}
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
          <ListItem icon="ios_share" primary={shareText} />
        </MenuItem>
        {!viewerPage && (
          <MenuItem onClick={toggleReporting}>
            <ListItem icon="outlined_flag" primary={reportText} color="error.dark" />
          </MenuItem>
        )}
        <MenuItem onClick={onCloseMenu}>
          <ListItem icon="block" primary={cancelText} color="grey" />
        </MenuItem>
      </Menu>
      {sharing && <Share href={asPath} title={name} onClose={toggleSharing} />}
      {reporting && (
        <CreateReport id={userId} type="user" anchorEl={anchorEl} onClose={onCloseReport} />
      )}
    </>
  )
}

export default MenuActs
