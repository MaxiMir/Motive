import { IconButton } from '@mui/material'
import { useOpenSignIn } from '@entities/signin'
import Profile from '@ui/icons/Profile'

function Unauthorized() {
  const openSignIn = useOpenSignIn()

  const onClick = () => openSignIn({ callbackUrl: '/' })

  return (
    <IconButton onClick={onClick}>
      <Profile sx={{ fontSize: 21, color: 'grey' }} />
    </IconButton>
  )
}

export default Unauthorized
