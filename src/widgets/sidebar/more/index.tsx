import { List, ListItem, ListItemIcon, ListItemText, Menu } from '@mui/material'
import { signOut } from 'next-auth/react'
import { MouseEvent, useId, useState } from 'react'
import { useIntl } from 'react-intl'
import { useViewer } from 'entities/viewer'
import Icon from 'shared/ui/icon'
import { usePaletteMode } from 'shared/ui/palette'

export function More() {
  const id = useId()
  const menuId = useId()
  const { formatMessage } = useIntl()
  const viewer = useViewer()
  const { mode, setMode } = usePaletteMode()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const open = Boolean(anchorEl)
  const modeIcon = `${mode}_mode`
  const moreText = formatMessage({ id: 'common.more' })
  const switchMode = formatMessage({ id: 'common.switch-mode' })
  const logOut = formatMessage({ id: 'common.log-out' })
  const cancelText = formatMessage({ id: 'common.cancel' })

  const onClick = (e: MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget)

  const onSignOut = () => signOut()

  const onClickMode = () => setMode(mode === 'dark' ? 'light' : 'dark')

  const onClose = () => setAnchorEl(null)

  return (
    <>
      <List>
        <ListItem
          id={id}
          button
          aria-controls={open ? menuId : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={onClick}
        >
          <ListItemIcon>
            <Icon name="menu" color="grey" />
          </ListItemIcon>
          <ListItemText primary={moreText} />
        </ListItem>
      </List>
      <Menu
        open={open}
        anchorEl={anchorEl}
        MenuListProps={{
          'aria-labelledby': id,
        }}
        onClose={onClose}
      >
        <ListItem button disabled onClick={onClickMode}>
          <ListItemIcon>
            <Icon name={modeIcon} />
          </ListItemIcon>
          <ListItemText primary={switchMode} />
        </ListItem>
        {viewer && (
          <ListItem button onClick={onSignOut}>
            <ListItemIcon>
              <Icon name="logout" />
            </ListItemIcon>
            <ListItemText primary={logOut} />
          </ListItem>
        )}
        <ListItem button onClick={onClose}>
          <ListItemIcon>
            <Icon name="block" color="grey" />
          </ListItemIcon>
          <ListItemText primary={cancelText} />
        </ListItem>
      </Menu>
    </>
  )
}
