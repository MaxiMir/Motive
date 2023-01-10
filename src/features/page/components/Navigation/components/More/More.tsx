import React, { MouseEvent, useContext, useId, useState } from 'react'
import dynamic from 'next/dynamic'
import { signOut } from 'next-auth/react'
import { List, ListItem, ListItemIcon, ListItemText, Menu } from '@mui/material'
import { paperClasses } from '@mui/material/Paper'
import { ThemeContext } from '@features/theme'
import useClient from '@hooks/useClient'
import useToggle from '@hooks/useToggle'
import AppIcon from '@ui/AppIcon'
import { useMessages } from './hooks/useMessages'

const LanguageMenu = dynamic(() => import('./components/LanguageMenu'))

function More() {
  const id = useId()
  const menuId = useId()
  const messages = useMessages()
  const client = useClient()
  const { mode, setMode } = useContext(ThemeContext)
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
            <AppIcon name="menu" />
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
            <AppIcon name="translate" />
          </ListItemIcon>
          <ListItemText primary={messages.languageText} />
        </ListItem>
        <ListItem button disabled onClick={onClickMode}>
          <ListItemIcon>
            <AppIcon name={modeIcon} />
          </ListItemIcon>
          <ListItemText primary={messages.switchMode} />
        </ListItem>
        {client && (
          <ListItem button onClick={onSignOut}>
            <ListItemIcon>
              <AppIcon name="logout" />
            </ListItemIcon>
            <ListItemText primary={messages.logOut} />
          </ListItem>
        )}
        <ListItem button onClick={onClose}>
          <ListItemIcon>
            <AppIcon name="block" sx={{ color: 'grey' }} />
          </ListItemIcon>
          <ListItemText primary={messages.cancelText} />
        </ListItem>
      </Menu>
      {showLanguage && <LanguageMenu anchorEl={anchorEl} onClose={onCloseLanguage} />}
    </>
  )
}

export default More
