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
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useClient } from 'entities/user'
import { useToggle } from 'shared/lib/hooks'
import Icon from 'shared/ui/Icon'
import { TooltipArrow } from 'shared/ui/styled'
import { Drawer } from './drawer'
import { useRoutes } from './lib'
import { More } from './more'
import { ProfileLink } from './profileLink'

const Notifications = dynamic(() => import('./notifications'))

interface SidebarProps {
  breakpoints?: boolean
  children: ReactNode
}

function Sidebar({ breakpoints, children }: SidebarProps) {
  const { asPath } = useRouter()
  const client = useClient()
  const { formatMessage } = useIntl()
  const [expanded, toggleExpanded] = useToggle(true)
  const routes = useRoutes()
  const ariaLabel = formatMessage({ id: expanded ? 'common.close' : 'common.open-menu' })
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
              <IconButton aria-label={ariaLabel} onClick={toggleExpanded}>
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
