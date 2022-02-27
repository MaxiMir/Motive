import { Button } from '@material-ui/core'
import useSignInModal from 'hooks/useSignInModal'
import AppIcon from 'components/UI/AppIcon'

export default function SignIn(): JSX.Element {
  const onClick = useSignInModal()

  return (
    <Button onClick={onClick}>
      <AppIcon name="login" />
    </Button>
  )
}
