import dynamic from 'next/dynamic'
import { useNotifications, NotificationBadge } from '@features/notification'
import useToggle from '@hooks/useToggle'
import TooltipArrow from '@ui/styled/TooltipArrow'
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { useMessages } from './hooks/useMessages'

const NotificationModal = dynamic(() => import('@features/notification'))

interface NotificationsProps {
  expanded: boolean
}

function Notifications({ expanded }: NotificationsProps) {
  const messages = useMessages()
  const { isLoading, data = [] } = useNotifications()
  const [open, toggle] = useToggle()

  return (
    <>
      <List>
        <TooltipArrow title={!expanded && messages.title} placement="right">
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
            <ListItemText primary={messages.title} />
          </ListItem>
        </TooltipArrow>
      </List>
      {open && <NotificationModal notifications={data} isLoading={isLoading} onClose={toggle} />}
    </>
  )
}

export default Notifications