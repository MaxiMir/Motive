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
import { withStyles } from '@mui/styles'
import { signOut } from 'next-auth/react'
import { useIntl } from 'react-intl'
import Link from 'next/link'
import { useViewer } from 'entities/viewer'
import Icon from 'shared/ui/Icon'
import { useRoutes } from './lib'

interface SidebarModalProps {
  onClose: () => void
  onOpenSettings: () => void
}

function SidebarModal({ onOpenSettings, onClose }: SidebarModalProps) {
  const viewer = useViewer()
  const routes = useRoutes()
  const { formatMessage } = useIntl()
  const logOut = formatMessage({ id: 'common.log-out' })
  const settings = formatMessage({ id: 'common.settings' })
  const closeText = formatMessage({ id: 'common.close' })

  const onSignOut = () => signOut()

  return (
    <StyledDrawer open anchor="left" onClose={onClose}>
      <Box display="flex" justifyContent="flex-end" alignItems="center" pr={1} height={56}>
        <IconButton aria-label={closeText} onClick={onClose}>
          <Icon name="close" />
        </IconButton>
      </Box>
      <Divider />
      <Box role="presentation" component="nav" height="100%">
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
        {viewer && (
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
    </StyledDrawer>
  )
}

const StyledDrawer = withStyles({
  paper: {
    width: 230,
    backgroundColor: 'underlay',
    borderRight: '1px solid rgb(38, 38, 38)',
  },
})(Drawer)

export default SidebarModal
