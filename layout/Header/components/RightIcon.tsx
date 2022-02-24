import dynamic from 'next/dynamic'
import { signIn } from 'next-auth/react'
import { Button } from '@material-ui/core'
import AppIcon from 'components/UI/AppIcon'
import { EVENTS } from 'route'

const Badge = dynamic(() => import('@material-ui/core/Badge'))

interface RightIconProps {
  authenticated: boolean
}

export default function RightIcon({ authenticated }: RightIconProps): JSX.Element {
  return (
    <>
      {!authenticated ? (
        <Button onClick={() => signIn()}>
          <AppIcon name="login" />
        </Button>
      ) : (
        <Button href={EVENTS}>
          <Badge color="error" badgeContent="" variant="dot" invisible={false}>
            <AppIcon name="notifications_none" />
          </Badge>
        </Button>
      )}
    </>
  )
}
