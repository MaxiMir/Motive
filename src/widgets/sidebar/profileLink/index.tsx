import { List } from '@mui/material'
import dynamic from 'next/dynamic'
import { useClient } from 'entities/user'
import { useMessage } from 'shared/lib/hooks'
import { TooltipArrow } from 'shared/ui/styled'

const SignIn = dynamic(() => import('./signIn'))
const User = dynamic(() => import('./user'))

interface ProfileLinkProps {
  expanded: boolean
}

export function ProfileLink({ expanded }: ProfileLinkProps) {
  const client = useClient()
  const primary = useMessage(`common.${client ? 'my-page' : 'sign-in'}`)

  return (
    <List>
      <TooltipArrow title={!expanded && primary} placement="right">
        {!client ? <SignIn primary={primary} /> : <User client={client} primary={primary} />}
      </TooltipArrow>
    </List>
  )
}
