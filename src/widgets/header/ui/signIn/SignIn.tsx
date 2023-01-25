import { IconButton } from '@mui/material'
import { useOpenSignIn } from '@features/sign-in'
import Icon from '@shared/ui/Icon'
import { TooltipArrow } from '@shared/ui/styled'
import { useMessages } from './lib/hooks/useMessages'

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
