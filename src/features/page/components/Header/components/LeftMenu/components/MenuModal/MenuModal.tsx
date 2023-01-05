import { KeyboardEvent } from 'react'
import { useRouter } from 'next/router'
import { signOut } from 'next-auth/react'
import {
  Box,
  List,
  Divider,
  ListItem,
  IconButton,
  Drawer,
  ListItemText,
  ListItemIcon,
} from '@mui/material'
import { drawerClasses } from '@mui/material/Drawer'
import useClient from '@hooks/useClient'
import AppIcon from '@ui/AppIcon'
import { useMessages } from './hooks/useMessages'

interface MenuModalProps {
  onClose: () => void
  onOpenSettings: () => void
}

function MenuModal({ onOpenSettings, onClose }: MenuModalProps) {
  const { push } = useRouter()
  const client = useClient()
  const messages = useMessages()
  const menu = getMenu()

  const onKeyDown = (event: KeyboardEvent) => {
    if (['Tab', 'Shift'].includes(event.key)) return

    onClose()
  }

  const onSignOut = () => signOut()

  function getMenu() {
    return [
      { primary: messages.news, icon: 'newspaper', link: 'news' },
      { primary: messages.features, icon: 'dynamic_form', link: 'features' },
      { primary: messages.contact, icon: 'all_inbox', link: 'contact' },
    ]
  }

  return (
    <Drawer
      open
      anchor="left"
      sx={{
        [`& .${drawerClasses.paper}`]: {
          width: 230,
          backgroundColor: 'underlay',
          borderRight: '1px solid rgb(38, 38, 38)',
        },
      }}
      onClose={onClose}
    >
      <Box display="flex" justifyContent="flex-end" alignItems="center" pr={1} height={56}>
        <IconButton aria-label={messages.closeText} onClick={onClose}>
          <AppIcon name="chevron_left" />
        </IconButton>
      </Box>
      <Divider />
      <Box role="presentation" component="nav" sx={{ height: '100%' }} onKeyDown={onKeyDown}>
        <Box display="flex" flexDirection="column" justifyContent="space-between" height="100%">
          <Box>
            <List>
              {menu.map(({ primary, icon, link }) => (
                <ListItem
                  button
                  disabled={link !== 'contact'}
                  onClick={() => push(link)}
                  key={link}
                >
                  <ListItemIcon>
                    <AppIcon name={icon} />
                  </ListItemIcon>
                  <ListItemText primary={primary} />
                </ListItem>
              ))}
            </List>
            <Divider light />
            <List>
              <ListItem button onClick={onOpenSettings}>
                <ListItemIcon>
                  <AppIcon name="settings" />
                </ListItemIcon>
                <ListItemText primary={messages.settings} />
              </ListItem>
            </List>
            {client && (
              <>
                <Divider light />
                <List>
                  <ListItem button onClick={onSignOut}>
                    <ListItemIcon>
                      <AppIcon name="logout" />
                    </ListItemIcon>
                    <ListItemText primary={messages.logOut} />
                  </ListItem>
                </List>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Drawer>
  )
}

export default MenuModal
