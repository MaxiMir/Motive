import { Button } from '@mui/material'
import useOpenSignIn from '@hooks/useOpenSignIn'
import AppIcon from '@ui/AppIcon'

export default function SignIn() {
  const openSignIn = useOpenSignIn()

  const onClick = () => {
    openSignIn({ callbackUrl: window.location.href })
  }

  return (
    <Button sx={{ color: 'common.white' }} onClick={onClick}>
      <AppIcon name="login" />
    </Button>
  )
}
