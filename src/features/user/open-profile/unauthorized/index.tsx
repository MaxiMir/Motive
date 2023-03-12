import { IconButton } from '@mui/material'
import { useSignIn } from 'entities/viewer'
import { Profile } from 'shared/ui/icons'

function Unauthorized() {
  const { openSignIn } = useSignIn()

  const onClick = () => openSignIn({ callbackUrl: '/' })

  return (
    <IconButton onClick={onClick}>
      <Profile sx={{ fontSize: 21, color: 'grey' }} />
    </IconButton>
  )
}

export default Unauthorized
