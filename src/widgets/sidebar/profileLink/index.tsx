import { List } from '@mui/material'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { useViewer } from 'entities/viewer'
import TooltipArrow from 'shared/ui/TooltipArrow'

const SignIn = dynamic(() => import('./signIn'))
const User = dynamic(() => import('./user'))

interface ProfileLinkProps {
  expanded: boolean
}

export function ProfileLink({ expanded }: ProfileLinkProps) {
  const { formatMessage } = useIntl()
  const viewer = useViewer()
  const primary = formatMessage({ id: viewer ? 'common.my-page' : 'common.sign-in' })

  return (
    <List>
      <TooltipArrow title={!expanded && primary} placement="right">
        {!viewer ? <SignIn primary={primary} /> : <User user={viewer} primary={primary} />}
      </TooltipArrow>
    </List>
  )
}
