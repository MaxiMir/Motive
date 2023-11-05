import { ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { useRouter } from 'next/router'
import { useViewerAct } from 'entities/viewer'
import Icon from 'shared/ui/icon'

interface SignInProps {
  primary: string
}

function SignIn({ primary }: SignInProps) {
  const { asPath } = useRouter()

  const onClick = useViewerAct(undefined, asPath)

  return (
    <ListItem button onClick={onClick}>
      <ListItemIcon>
        <Icon name="login" color="grey" />
      </ListItemIcon>
      <ListItemText primary={primary} />
    </ListItem>
  )
}

export default SignIn
