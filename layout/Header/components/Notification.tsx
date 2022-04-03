import { Badge, Button } from '@material-ui/core'
import AppIcon from 'components/UI/AppIcon'

export default function Notification(): JSX.Element {
  return (
    <Button disabled>
      <Badge color="error" badgeContent="" variant="dot" invisible>
        <AppIcon name="notifications_none" />
      </Badge>
    </Button>
  )
}
