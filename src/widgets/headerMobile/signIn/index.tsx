import { IconButton } from '@mui/material'
import { useIntl } from 'react-intl'
import { useRouter } from 'next/router'
import { useViewerAct } from 'entities/viewer'
import Icon from 'shared/ui/Icon'
import TooltipArrow from 'shared/ui/TooltipArrow'

function SignIn() {
  const { asPath } = useRouter()
  const { formatMessage } = useIntl()
  const title = formatMessage({ id: 'common.sign-in' })

  const onClick = useViewerAct(undefined, asPath)

  return (
    <TooltipArrow title={title}>
      <IconButton onClick={onClick}>
        <Icon name="login" />
      </IconButton>
    </TooltipArrow>
  )
}

export default SignIn
