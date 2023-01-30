import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { useNotifications, NotificationBadge } from 'entities/notification'
import { useToggle } from 'shared/lib/hooks'
import TooltipArrow from 'shared/ui/TooltipArrow'

const NotificationModal = dynamic(() =>
  import('entities/notification').then((m) => m.NotificationModal),
)

interface NotificationsProps {
  expanded: boolean
}

function Notifications({ expanded }: NotificationsProps) {
  const { isLoading, data = [] } = useNotifications()
  const { formatMessage } = useIntl()
  const [open, toggle] = useToggle()
  const primary = formatMessage({ id: 'common.notifications' })

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
