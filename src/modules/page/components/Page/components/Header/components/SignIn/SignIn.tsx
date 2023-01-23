import { IconButton } from '@mui/material'
import { useOpenSignIn } from '@modules/signin'
import Icon from '@ui/Icon'
import TooltipArrow from '@ui/styled/TooltipArrow'
import { useMessages } from './hooks/useMessages'

function SignIn() {
  const messages = useMessages()
  const openSignIn = useOpenSignIn()

  const onClick = () => {
    openSignIn({ callbackUrl: window.location.href })
  }

  return (
    <TooltipArrow title={messages.title}>
      <IconButton onClick={onClick}>
        <Icon name="login" />
      </IconButton>
    </TooltipArrow>
  )
}

export default SignIn
