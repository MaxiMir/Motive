import { List } from '@mui/material'
import dynamic from 'next/dynamic'
import { useClient } from '@entities/user'
import { TooltipArrow } from '@shared/ui/styled'
import { useMessages } from './lib'

const SignIn = dynamic(() => import('./signIn'))
const User = dynamic(() => import('./user'))

interface ProfileLinkProps {
  expanded: boolean
}

export function ProfileLink({ expanded }: ProfileLinkProps) {
  const client = useClient()
  const messages = useMessages(client)

  return (
    <List>
      <TooltipArrow title={!expanded && messages.title} placement="right">
        {!client ? (
          <SignIn primary={messages.title} />
        ) : (
          <User client={client} primary={messages.title} />
        )}
      </TooltipArrow>
    </List>
  )
}
