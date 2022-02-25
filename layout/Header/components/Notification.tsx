import { Badge, Button } from '@material-ui/core'
import { NOTIFICATION } from 'route'
import AppIcon from 'components/UI/AppIcon'

export default function Notification(): JSX.Element {
  return (
    <Button href={NOTIFICATION}>
      <Badge color="error" badgeContent="" variant="dot" invisible={false}>
        <AppIcon name="notifications_none" />
      </Badge>
    </Button>
  )
}
