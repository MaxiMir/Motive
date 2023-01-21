import Link from 'next/link'
import { signOut } from 'next-auth/react'
import {
  Box,
  List,
  Divider,
  ListItem,
  IconButton,
  Stack,
  Drawer,
  ListItemText,
  ListItemIcon,
} from '@mui/material'
import { drawerClasses } from '@mui/material/Drawer'
import useClient from '@hooks/useClient'
import AppIcon from '@ui/AppIcon'
import { useMessages } from './hooks/useMessages'
import { useRoutes } from './hooks/useRoutes'

interface NavigationModalProps {
  onClose: () => void
  onOpenSettings: () => void
}

function NavigationModal({ onOpenSettings, onClose }: NavigationModalProps) {
  const client = useClient()
  const messages = useMessages()
  const routes = useRoutes()

  const onSignOut = () => signOut()

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
          <AppIcon name="close" />
        </IconButton>
      </Box>
      <Divider />
      <Box role="presentation" component="nav" sx={{ height: '100%' }}>
        <Stack justifyContent="space-between" height="100%">
          <Box>
            <List>
              {routes.map(({ primary, icon, href }) => (
                <ListItem button href={href} disabled={!href} component={Link} key={href}>
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
        </Stack>
      </Box>
    </Drawer>
  )
}

export default NavigationModal
