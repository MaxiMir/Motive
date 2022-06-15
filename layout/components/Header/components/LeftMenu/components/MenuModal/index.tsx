import { KeyboardEvent } from 'react'
import { signOut } from 'next-auth/react'
import { Box, List, Divider, ListItem, Drawer, ListItemText, ListItemIcon } from '@mui/material'
import useLocale from 'hooks/useLocale'
import useClient from 'hooks/useClient'
import AppIcon from 'components/UI/AppIcon'
import { MENU } from './helper'
import i18n from './i18n'

interface MenuModalProps {
  onClose: () => void
  onOpenSettings: () => void
}

export default function MenuModal({ onOpenSettings, onClose }: MenuModalProps) {
  const { locale, go } = useLocale()
  const client = useClient()
  const i18nElements = i18n[locale]
  const { logOut, settings } = i18nElements

  const onKeyDown = (event: KeyboardEvent) => {
    if (['Tab', 'Shift'].includes(event.key)) return

    onClose()
  }

  const onSignOut = () => signOut()

  return (
    <Drawer open onClose={onClose}>
      <Box role="presentation" sx={{ height: '100%', minWidth: 220, padding: '60px 0 8px' }} onKeyDown={onKeyDown}>
        <Box display="flex" flexDirection="column" justifyContent="space-between" height="100%">
          <Box>
            <List>
              {MENU.map(({ id, icon, link }) => (
                <ListItem button disabled={!link} onClick={() => go(link)} key={id}>
                  <ListItemText primary={i18nElements[id]} />
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
              <ListItemText primary="Alpha 1.0.54" color="secondary" sx={{ color: 'zen.sand' }} />
            </ListItem>
          </List>
        </Box>
      </Box>
    </Drawer>
  )
}
