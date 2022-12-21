import { Button } from '@mui/material'
import { useOpenSignIn } from '@features/signin'
import AppIcon from '@ui/AppIcon'

function SignIn() {
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

export default SignIn
