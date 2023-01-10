import dynamic from 'next/dynamic'
import useClient from '@hooks/useClient'
import TooltipArrow from '@ui/styled/TooltipArrow'
import { useMessages } from './hooks/useMessages'

const SignIn = dynamic(() => import('./components/SignIn'))
const User = dynamic(() => import('./components/User'))

interface ProfileLinkProps {
  open: boolean
}

function ProfileLink({ open }: ProfileLinkProps) {
  const client = useClient()
  const messages = useMessages(client)

  return (
    <TooltipArrow title={!open && messages.title} placement="right">
      {!client ? (
        <SignIn primary={messages.title} />
      ) : (
        <User client={client} primary={messages.title} />
      )}
    </TooltipArrow>
  )
}

export default ProfileLink
