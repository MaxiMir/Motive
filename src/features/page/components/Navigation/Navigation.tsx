import React, { ReactNode } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Box, List, Divider, IconButton, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import useToggle from '@hooks/useToggle'
import AppIcon from '@ui/AppIcon'
import TooltipArrow from '@ui/styled/TooltipArrow'
import Drawer from '@ui/styled/Drawer'
import { useRoutes } from './hooks/useRoutes'
import { useMessages } from './hooks/useMessages'
import ProfileLink from './components/ProfileLink'
import More from './components/More'

interface NavigationProps {
  children: ReactNode
}

function Navigation({ children }: NavigationProps) {
  const { asPath } = useRouter()
  const [open, toggle] = useToggle(true)
  const messages = useMessages(open)
  const routes = useRoutes()
  const menuIcon = open ? 'arrow_left' : 'arrow_right'

  return (
    <Box display="flex" height="100%">
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          display: {
            xs: 'none',
            xl: 'block',
          },
        }}
      >
        <Box
          role="presentation"
          component="nav"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          pb={2}
          height="100%"
        >
          <Box>
            <Box display="flex" alignItems="center" paddingLeft={1} sx={{ height: 56 }}>
              <IconButton aria-label={messages.ariaLabel} onClick={toggle}>
                <AppIcon name={menuIcon} sx={{ color: 'grey' }} />
              </IconButton>
            </Box>
            <Divider light />
            <List>
              {routes.map(({ primary, href, icon }) => (
                <TooltipArrow title={!open && primary} placement="right" key={href}>
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
                      <AppIcon name={icon} />
                    </ListItemIcon>
                    <ListItemText primary={primary} />
                  </ListItem>
                </TooltipArrow>
              ))}
            </List>
            <Divider light />
            <List>
              <ProfileLink open={open} />
            </List>
          </Box>
          <More />
        </Box>
      </Drawer>
      {children}
    </Box>
  )
}

export default Navigation
