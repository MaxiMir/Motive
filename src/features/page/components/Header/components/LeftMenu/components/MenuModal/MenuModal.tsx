import { KeyboardEvent } from 'react'
import { useRouter } from 'next/router'
import { signOut } from 'next-auth/react'
import { Box, List, Divider, ListItem, Drawer, ListItemText, ListItemIcon } from '@mui/material'
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
    <Drawer open onClose={onClose}>
      <Box role="presentation" sx={{ minWidth: 230, height: '100%', padding: '60px 0 8px' }} onKeyDown={onKeyDown}>
        <Box display="flex" flexDirection="column" justifyContent="space-between" height="100%">
          <Box>
            <List>
              {menu.map(({ primary, icon, link }) => (
                <ListItem button disabled={link !== 'contact'} onClick={() => push(link)} key={link}>
                  <ListItemText primary={primary} />
                  <ListItemIcon>
                    <AppIcon name={icon} />
                  </ListItemIcon>
                </ListItem>
              ))}
            </List>
            <Divider light />
            <List>
              <ListItem button onClick={onOpenSettings}>
                <ListItemText primary={messages.settings} />
                <ListItemIcon>
                  <AppIcon name="settings" />
                </ListItemIcon>
              </ListItem>
            </List>
            {client && (
              <>
                <Divider light />
                <List>
                  <ListItem button onClick={onSignOut}>
                    <ListItemText primary={messages.logOut} />
                  </ListItem>
                </List>
              </>
            )}
          </Box>
          <List>
            <ListItem>
              <ListItemText primary="Alpha 1.0.89" sx={{ color: 'zen.sand' }} />
            </ListItem>
          </List>
        </Box>
      </Box>
    </Drawer>
  )
}

export default MenuModal
