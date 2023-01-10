import { ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { useOpenSignIn } from '@features/signin'
import AppIcon from '@ui/AppIcon'

interface SignInProps {
  primary: string
}

function SignIn({ primary }: SignInProps) {
  const openSignIn = useOpenSignIn()

  const onClick = () => openSignIn({ callbackUrl: '/' })

  return (
    <ListItem
      button
      sx={{
        '& span': {
          color: 'grey',
        },
      }}
      onClick={onClick}
    >
      <ListItemIcon>
        <AppIcon name="login" />
      </ListItemIcon>
      <ListItemText primary={primary} />
    </ListItem>
  )
}

export default SignIn
