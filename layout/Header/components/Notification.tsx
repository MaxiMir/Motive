import { Badge, Button } from '@mui/material'
import AppIcon from 'components/UI/AppIcon'

export default function Notification(): JSX.Element {
  return (
    <Button disabled sx={{ color: 'common.white' }}>
      <Badge color="error" badgeContent="" variant="dot" invisible>
        <AppIcon name="notifications_none" />
      </Badge>
    </Button>
  )
}
