import dynamic from 'next/dynamic'
import useClient from '@hooks/useClient'
import TooltipArrow from '@ui/styled/TooltipArrow'
import { useMessages } from './hooks/useMessages'

const SignIn = dynamic(() => import('./components/SignIn'))
const User = dynamic(() => import('./components/User'))

function ProfileLink() {
  const client = useClient()
  const messages = useMessages()

  return (
    <TooltipArrow title={messages.title}>
      {!client ? <SignIn /> : <User client={client} />}
    </TooltipArrow>
  )
}

export default ProfileLink
