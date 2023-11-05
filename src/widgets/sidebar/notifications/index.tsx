import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { useNotifications, NotificationBadge } from 'entities/notification'
import { useViewer } from 'entities/viewer'
import { useToggle } from 'shared/lib/hooks'
import TooltipArrow from 'shared/ui/tooltip-arrow'

const ReadNotificationsModal = dynamic(() => import('features/notification/read-notifications'))

interface NotificationsProps {
  expanded: boolean
}

function Notifications({ expanded }: NotificationsProps) {
  const viewer = useViewer()
  const { isLoading, data = [] } = useNotifications(viewer?.id)
  const { formatMessage } = useIntl()
  const [open, toggle] = useToggle()
  const primary = formatMessage({ id: 'common.notifications' })

  return (
    <>
      <List>
        <TooltipArrow title={!expanded && primary} placement="right">
          <ListItem button onClick={toggle}>
            <ListItemIcon>
              <NotificationBadge notifications={data} color="grey" />
            </ListItemIcon>
            <ListItemText primary={primary} />
          </ListItem>
        </TooltipArrow>
      </List>
      {open && (
        <ReadNotificationsModal notifications={data} isLoading={isLoading} onClose={toggle} />
      )}
    </>
  )
}

export default Notifications
