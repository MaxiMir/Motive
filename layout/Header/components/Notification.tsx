import { Badge, Button } from '@material-ui/core'
import { NOTIFICATION } from 'route'
import AppIcon from 'components/UI/AppIcon'

export default function Notification(): JSX.Element {
  // TODO
  return (
    <Button href={NOTIFICATION} disabled>
      <Badge color="error" badgeContent="" variant="dot" invisible>
        <AppIcon name="notifications_none" />
      </Badge>
    </Button>
  )
}
