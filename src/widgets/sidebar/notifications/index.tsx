import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import dynamic from 'next/dynamic'
import { useNotifications, NotificationBadge } from 'entities/notification'
import { useMessage, useToggle } from 'shared/lib/hooks'
import { TooltipArrow } from 'shared/ui/styled'

const NotificationModal = dynamic(() =>
  import('entities/notification').then((m) => m.NotificationModal),
)

interface NotificationsProps {
  expanded: boolean
}

function Notifications({ expanded }: NotificationsProps) {
  const primary = useMessage('common.notifications')
  const { isLoading, data = [] } = useNotifications()
  const [open, toggle] = useToggle()

  return (
    <>
      <List>
        <TooltipArrow title={!expanded && primary} placement="right">
          <ListItem
            button
            sx={{
              '& span': {
                color: 'grey',
              },
            }}
            onClick={toggle}
          >
            <ListItemIcon>
              <NotificationBadge notifications={data} />
            </ListItemIcon>
            <ListItemText primary={primary} />
          </ListItem>
        </TooltipArrow>
      </List>
      {open && <NotificationModal notifications={data} isLoading={isLoading} onClose={toggle} />}
    </>
  )
}

export default Notifications
