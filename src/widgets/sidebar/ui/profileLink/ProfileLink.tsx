import { List } from '@mui/material'
import dynamic from 'next/dynamic'
import { useClient } from '@entities/user'
import TooltipArrow from '@shared/ui/styled/TooltipArrow'
import { useMessages } from './lib/hooks/useMessages'

const SignIn = dynamic(() => import('./ui/SignIn'))
const User = dynamic(() => import('./ui/User'))

interface ProfileLinkProps {
  expanded: boolean
}

function ProfileLink({ expanded }: ProfileLinkProps) {
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

export default ProfileLink