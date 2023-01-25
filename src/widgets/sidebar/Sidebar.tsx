import {
  Box,
  List,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
} from '@mui/material'
import { ReactNode } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useClient } from '@entities/user'
import { useToggle } from '@shared/lib/hooks'
import Icon from '@shared/ui/Icon'
import TooltipArrow from '@shared/ui/styled/TooltipArrow'
import { useMessages } from './lib/hooks/useMessages'
import { useRoutes } from './lib/hooks/useRoutes'
import Drawer from './ui/Drawer'
import More from './ui/more/More'
import ProfileLink from './ui/profileLink/ProfileLink'

const Notifications = dynamic(() => import('./ui/notifications/Notifications'))

interface SidebarProps {
  breakpoints?: boolean
  children: ReactNode
}

function Sidebar({ breakpoints, children }: SidebarProps) {
  const { asPath } = useRouter()
  const client = useClient()
  const [expanded, toggleExpanded] = useToggle(true)
  const messages = useMessages(expanded)
  const routes = useRoutes()
  const menuIcon = expanded ? 'arrow_left' : 'arrow_right'

  return (
    <Box display="flex" height="100%">
      <Drawer
        variant="permanent"
        open={expanded}
        sx={{
          display: !breakpoints
            ? undefined
            : {
                xs: 'none',
                xl: 'block',
              },
        }}
      >
        <Stack
          role="presentation"
          component="nav"
          justifyContent="space-between"
          pb={2}
          height="100%"
        >
          <Box>
            <Box display="flex" alignItems="center" paddingLeft={1} sx={{ height: 56 }}>
              <IconButton aria-label={messages.ariaLabel} onClick={toggleExpanded}>
                <Icon name={menuIcon} sx={{ color: 'grey' }} />
              </IconButton>
            </Box>
            <Divider light />
            <List>
              {routes.map(({ primary, href, icon }) => (
                <TooltipArrow title={!expanded && primary} placement="right" key={href}>
                  <ListItem
                    button
                    href={href}
                    disabled={!href}
                    component={Link}
                    sx={{
                      '& span': {
                        color: asPath.includes(href) ? 'inherit' : 'grey',
                      },
                    }}
                  >
                    <ListItemIcon>
                      <Icon name={icon} />
                    </ListItemIcon>
                    <ListItemText primary={primary} />
                  </ListItem>
                </TooltipArrow>
              ))}
            </List>
            <Divider light />
            {client && (
              <>
                <Notifications expanded={expanded} />
                <Divider light />
              </>
            )}
            <ProfileLink expanded={expanded} />
          </Box>
          <More />
        </Stack>
      </Drawer>
      {children}
    </Box>
  )
}

export default Sidebar
