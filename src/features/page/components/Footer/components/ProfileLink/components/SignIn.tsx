import { IconButton } from '@mui/material'
import { useOpenSignIn } from '@features/signin'
import ProfileIcon from '@ui/icons/ProfileIcon'

function SignIn() {
  const openSignIn = useOpenSignIn()

  const onClick = () => openSignIn({ callbackUrl: '/' })

  return (
    <IconButton sx={{ opacity: 0.6 }} onClick={onClick}>
      <ProfileIcon />
    </IconButton>
  )
}

export default SignIn
