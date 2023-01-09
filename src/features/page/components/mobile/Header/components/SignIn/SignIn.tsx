import { IconButton } from '@mui/material'
import { useOpenSignIn } from '@features/signin'
import AppIcon from '@ui/AppIcon'
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
        <AppIcon name="login" />
      </IconButton>
    </TooltipArrow>
  )
}

export default SignIn
