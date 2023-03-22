import { List, ListItem, ListItemIcon, ListItemText, Menu } from '@mui/material'
import { signOut } from 'next-auth/react'
import { MouseEvent, useId, useState } from 'react'
import { useClient } from 'entities/viewer'
import Icon from 'shared/ui/Icon'
import { usePaletteMode } from 'shared/ui/palette'
import { useMessages } from './lib'

export function More() {
  const id = useId()
  const menuId = useId()
  const messages = useMessages()
  const client = useClient()
  const { mode, setMode } = usePaletteMode()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const open = Boolean(anchorEl)
  const modeIcon = `${mode}_mode`

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
          sx={{
            '& span': {
              color: 'grey',
            },
          }}
          onClick={onClick}
        >
          <ListItemIcon>
            <Icon name="menu" />
          </ListItemIcon>
          <ListItemText primary={messages.moreText} />
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
          <ListItemText primary={messages.switchMode} />
        </ListItem>
        {client && (
          <ListItem button onClick={onSignOut}>
            <ListItemIcon>
              <Icon name="logout" />
            </ListItemIcon>
            <ListItemText primary={messages.logOut} />
          </ListItem>
        )}
        <ListItem button onClick={onClose}>
          <ListItemIcon>
            <Icon name="block" sx={{ color: 'grey' }} />
          </ListItemIcon>
          <ListItemText primary={messages.cancelText} />
        </ListItem>
      </Menu>
    </>
  )
}
