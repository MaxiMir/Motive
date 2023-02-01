import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { useNotifications, NotificationBadge } from 'entities/notification'
import { useClient } from 'entities/user'
import { useToggle } from 'shared/lib/hooks'
import TooltipArrow from 'shared/ui/TooltipArrow'

const ReadNotificationsModal = dynamic(() => import('features/notification/read-notifications'))

interface NotificationsProps {
  expanded: boolean
}

function Notifications({ expanded }: NotificationsProps) {
  const client = useClient()
  const { isLoading, data = [] } = useNotifications(client?.id)
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
      {open && (
        <ReadNotificationsModal notifications={data} isLoading={isLoading} onClose={toggle} />
      )}
    </>
  )
}

export default Notifications
