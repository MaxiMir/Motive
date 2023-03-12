import { IconButton } from '@mui/material'
import { useIntl } from 'react-intl'
import { useRouter } from 'next/router'
import { useSignIn } from 'entities/viewer'
import Icon from 'shared/ui/Icon'
import TooltipArrow from 'shared/ui/TooltipArrow'

function SignIn() {
  const { asPath } = useRouter()
  const { openSignIn } = useSignIn()
  const { formatMessage } = useIntl()
  const title = formatMessage({ id: 'common.sign-in' })

  const onClick = () => {
    openSignIn({ callbackUrl: asPath })
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
