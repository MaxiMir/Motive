import { KeyboardEvent } from 'react'
import { useRouter } from 'next/router'
import { useIntl } from 'react-intl'
import { signOut } from 'next-auth/react'
import { Box, List, Divider, ListItem, Drawer, ListItemText, ListItemIcon } from '@mui/material'
import useClient from '@hooks/useClient'
import AppIcon from '@ui/AppIcon'

interface MenuModalProps {
  onClose: () => void
  onOpenSettings: () => void
}

export default function MenuModal({ onOpenSettings, onClose }: MenuModalProps) {
  const { formatMessage } = useIntl()
  const { push } = useRouter()
  const client = useClient()
  const logOut = formatMessage({ id: 'common.log-out' })
  const settings = formatMessage({ id: 'common.settings' })
  const menu = getMenu()

  const onKeyDown = (event: KeyboardEvent) => {
    if (['Tab', 'Shift'].includes(event.key)) return

    onClose()
  }

  const onSignOut = () => signOut()

  function getMenu() {
    return [
      { primary: formatMessage({ id: 'common.news' }), icon: 'newspaper', link: 'news' },
      { primary: formatMessage({ id: 'common.features' }), icon: 'dynamic_form', link: 'features' },
      { primary: formatMessage({ id: 'common.contact' }), icon: 'all_inbox', link: 'contact' },
    ]
  }

  return (
    <Drawer open onClose={onClose}>
      <Box role="presentation" sx={{ height: '100%', minWidth: 230, padding: '60px 0 8px' }} onKeyDown={onKeyDown}>
        <Box display="flex" flexDirection="column" justifyContent="space-between" height="100%">
          <Box>
            <List>
              {menu.map(({ primary, icon, link }) => (
                <ListItem button disabled={!link} onClick={() => push(link)} key={link}>
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
                <ListItemText primary={settings} />
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
                    <ListItemText primary={logOut} />
                  </ListItem>
                </List>
              </>
            )}
          </Box>
          <List>
            <ListItem>
              <ListItemText primary="Alpha 1.0.82" sx={{ color: 'zen.sand' }} />
            </ListItem>
          </List>
        </Box>
      </Box>
    </Drawer>
  )
}
