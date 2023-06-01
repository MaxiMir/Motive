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
import { signOut } from 'next-auth/react'
import { useIntl } from 'react-intl'
import Link from 'next/link'
import { useClient } from 'entities/viewer'
import Icon from 'shared/ui/Icon'
import { useRoutes } from './lib'

interface SidebarModalProps {
  onClose: () => void
  onOpenSettings: () => void
}

function SidebarModal({ onOpenSettings, onClose }: SidebarModalProps) {
  const client = useClient()
  const routes = useRoutes()
  const { formatMessage } = useIntl()
  const logOut = formatMessage({ id: 'common.log-out' })
  const settings = formatMessage({ id: 'common.settings' })
  const closeText = formatMessage({ id: 'common.close' })

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
        <IconButton aria-label={closeText} onClick={onClose}>
          <Icon name="close" />
        </IconButton>
      </Box>
      <Divider />
      <Box role="presentation" component="nav" sx={{ height: '100%' }}>
        <List>
          {routes.map(({ primary, icon, href }) => (
            <ListItem button href={href} component={Link} key={href}>
              <ListItemIcon>
                <Icon name={icon} />
              </ListItemIcon>
              <ListItemText primary={primary} />
            </ListItem>
          ))}
        </List>
        <Divider light />
        <List>
          <ListItem button onClick={onOpenSettings}>
            <ListItemIcon>
              <Icon name="settings" />
            </ListItemIcon>
            <ListItemText primary={settings} />
          </ListItem>
        </List>
        {client && (
          <>
            <Divider light />
            <List>
              <ListItem button onClick={onSignOut}>
                <ListItemIcon>
                  <Icon name="logout" />
                </ListItemIcon>
                <ListItemText primary={logOut} />
              </ListItem>
            </List>
          </>
        )}
      </Box>
    </Drawer>
  )
}

export default SidebarModal
