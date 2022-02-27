import { Button } from '@material-ui/core'
import useOpenSignIn from 'hooks/useOpenSignIn'
import AppIcon from 'components/UI/AppIcon'

export default function SignIn(): JSX.Element {
  const openSignIn = useOpenSignIn()

  const onClick = () => {
    openSignIn({ callbackUrl: window.location.href })
  }

  return (
    <Button onClick={onClick}>
      <AppIcon name="login" />
    </Button>
  )
}
