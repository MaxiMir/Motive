import { List } from '@mui/material'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { useClient } from 'entities/user'
import TooltipArrow from 'shared/ui/TooltipArrow'

const SignIn = dynamic(() => import('./signIn'))
const User = dynamic(() => import('./user'))

interface ProfileLinkProps {
  expanded: boolean
}

export function ProfileLink({ expanded }: ProfileLinkProps) {
  const { formatMessage } = useIntl()
  const client = useClient()
  const primary = formatMessage({ id: client ? 'common.my-page' : 'common.sign-in' })

  return (
    <List>
      <TooltipArrow title={!expanded && primary} placement="right">
        {!client ? <SignIn primary={primary} /> : <User client={client} primary={primary} />}
      </TooltipArrow>
    </List>
  )
}
