import { IconButton } from '@mui/material'
import { useOpenSignIn } from '@features/signin'
import Profile from '@ui/icons/Profile'

function SignIn() {
  const openSignIn = useOpenSignIn()

  const onClick = () => openSignIn({ callbackUrl: '/' })

  return (
    <IconButton sx={{ color: 'grey' }} onClick={onClick}>
      <Profile />
    </IconButton>
  )
}

export default SignIn
