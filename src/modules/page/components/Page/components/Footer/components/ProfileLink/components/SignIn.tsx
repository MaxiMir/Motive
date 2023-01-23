import { IconButton } from '@mui/material'
import { useOpenSignIn } from '@modules/signin'
import Profile from '@ui/icons/Profile'

function SignIn() {
  const openSignIn = useOpenSignIn()

  const onClick = () => openSignIn({ callbackUrl: '/' })

  return (
    <IconButton onClick={onClick}>
      <Profile sx={{ fontSize: 21, color: 'grey' }} />
    </IconButton>
  )
}

export default SignIn
