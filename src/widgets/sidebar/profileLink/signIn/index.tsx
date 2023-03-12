import { ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { useRouter } from 'next/router'
import { useSignIn } from 'entities/viewer'
import Icon from 'shared/ui/Icon'

interface SignInProps {
  primary: string
}

function SignIn({ primary }: SignInProps) {
  const { asPath } = useRouter()
  const { openSignIn } = useSignIn()

  const onClick = () => openSignIn({ callbackUrl: asPath })

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
        <Icon name="login" />
      </ListItemIcon>
      <ListItemText primary={primary} />
    </ListItem>
  )
}

export default SignIn
