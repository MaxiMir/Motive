import dynamic from 'next/dynamic'
import useClient from '@hooks/useClient'
import TooltipArrow from '@ui/styled/TooltipArrow'
import { useMessages } from './hooks/useMessages'

const SignInButton = dynamic(() => import('./components/SignInButton'))
const UserButton = dynamic(() => import('./components/UserButton'))

function ProfileLink() {
  const client = useClient()
  const messages = useMessages()

  return (
    <TooltipArrow title={messages.title}>
      {!client ? <SignInButton /> : <UserButton client={client} />}
    </TooltipArrow>
  )
}

export default ProfileLink
