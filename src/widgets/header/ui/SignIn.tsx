import { IconButton } from '@mui/material'
import { useIntl } from 'react-intl'
import { useOpenSignIn } from '@features/sign-in'
import Icon from '@shared/ui/Icon'
import { TooltipArrow } from '@shared/ui/styled'

export function SignIn() {
  const { formatMessage } = useIntl()
  const openSignIn = useOpenSignIn()
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
