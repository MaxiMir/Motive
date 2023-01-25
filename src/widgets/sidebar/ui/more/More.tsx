import { List, ListItem, ListItemIcon, ListItemText, Menu } from '@mui/material'
import { paperClasses } from '@mui/material/Paper'
import { signOut } from 'next-auth/react'
import { MouseEvent, useId, useState } from 'react'
import dynamic from 'next/dynamic'
import { usePaletteModeContext } from '@entities/theme'
import { useClient } from '@entities/user'
import { useToggle } from '@shared/lib/hooks'
import Icon from '@shared/ui/Icon'
import { useMessages } from './lib/hooks/useMessages'

const LanguageMenu = dynamic(() => import('./ui/languageMenu/LanguageMenu'))

function More() {
  const id = useId()
  const menuId = useId()
  const messages = useMessages()
  const client = useClient()
  const { mode, setMode } = usePaletteModeContext()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [showLanguage, toggleShowLanguage] = useToggle()
  const open = Boolean(anchorEl)
  const modeIcon = `${mode}_mode`

  const onClick = (e: MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget)

  const onSignOut = () => signOut()

  const onClickMode = () => setMode(mode === 'dark' ? 'light' : 'dark')

  const onClose = () => setAnchorEl(null)

  const onCloseLanguage = () => {
    onClose()
    toggleShowLanguage()
  }

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
        sx={{
          [`& .${paperClasses.root}`]: {
            width: 210,
          },
        }}
        onClose={onClose}
      >
        <ListItem button onClick={toggleShowLanguage}>
          <ListItemIcon>
            <Icon name="translate" />
          </ListItemIcon>
          <ListItemText primary={messages.languageText} />
        </ListItem>
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
      {showLanguage && <LanguageMenu anchorEl={anchorEl} onClose={onCloseLanguage} />}
    </>
  )
}

export default More
