import {
  Box,
  List,
  Divider,
  IconButton,
  ListItem,
  Stack,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useViewer } from 'entities/viewer'
import { useToggle } from 'shared/lib/hooks'
import Icon from 'shared/ui/icon'
import TooltipArrow from 'shared/ui/tooltip-arrow'
import { Drawer } from './drawer'
import { useRoutes } from './lib'
import { More } from './more'
import { ProfileLink } from './profileLink'

const Notifications = dynamic(() => import('./notifications'))

function Sidebar() {
  const { asPath } = useRouter()
  const viewer = useViewer()
  const { formatMessage } = useIntl()
  const [expanded, toggleExpanded] = useToggle(false)
  const routes = useRoutes()
  const ariaLabel = formatMessage({ id: expanded ? 'common.close' : 'common.open-menu' })
  const menuIcon = expanded ? 'arrow_left' : 'arrow_right'

  return (
    <Drawer variant="permanent" open={expanded}>
      <Stack
        role="presentation"
        component="nav"
        justifyContent="space-between"
        pb={2}
        height="100%"
      >
        <Box>
          <Box display="flex" alignItems="center" paddingLeft={1} height={56}>
            <IconButton aria-label={ariaLabel} onClick={toggleExpanded}>
              <Icon name={menuIcon} color="grey" />
            </IconButton>
          </Box>
          <Divider light />
          <List>
            {routes.map(({ primary, href, icon }) => (
              <TooltipArrow title={!expanded && primary} placement="right" key={href}>
                <ListItem button href={href} component={Link}>
                  <ListItemIcon>
                    <Icon name={icon} color={asPath.includes(href) ? 'inherit' : 'grey'} />
                  </ListItemIcon>
                  <ListItemText primary={primary} />
                </ListItem>
              </TooltipArrow>
            ))}
          </List>
          <Divider light />
          {viewer && (
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
  )
}

export default Sidebar
