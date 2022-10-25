import { Button } from '@mui/material'
import useOpenSignIn from 'src/common/hooks/useOpenSignIn'
import AppIcon from 'src/common/ui/AppIcon'

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
