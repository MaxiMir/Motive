import dynamic from 'next/dynamic'
import { useClient } from '@entities/user'
import { TooltipArrow } from '@shared/ui/styled'
import { useMessages } from './lib'

const Unauthorized = dynamic(() => import('./ui/Unauthorized'))
const User = dynamic(() => import('./ui/User'))

function OpeningProfile() {
  const client = useClient()
  const messages = useMessages(client)

  return (
    <TooltipArrow title={messages.title}>
      {!client ? <Unauthorized /> : <User client={client} />}
    </TooltipArrow>
  )
}

export default OpeningProfile
