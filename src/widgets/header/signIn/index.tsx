import { IconButton } from '@mui/material'
import { useIntl } from 'react-intl'
import { useOpenSignIn } from 'entities/signin'
import Icon from 'shared/ui/Icon'
import { TooltipArrow } from 'shared/ui/styled'

function SignIn() {
  const openSignIn = useOpenSignIn()
  const { formatMessage } = useIntl()
  const title = formatMessage({ id: 'common.sign-in' })

  const onClick = () => {
    openSignIn({ callbackUrl: window.location.href })
  }

  return (
    <TooltipArrow title={title}>
      <IconButton onClick={onClick}>
        <Icon name="login" />
      </IconButton>
    </TooltipArrow>
  )
}

export default SignIn
