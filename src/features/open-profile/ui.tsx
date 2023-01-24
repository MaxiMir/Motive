import dynamic from 'next/dynamic'
import useClient from '@hooks/useClient'
import TooltipArrow from '@ui/styled/TooltipArrow'
import { useMessages } from './lib/hooks/useMessages'

const Unauthorized = dynamic(() => import('./ui/Unauthorized'))
const User = dynamic(() => import('./ui/User'))

function OpenProfile() {
  const client = useClient()
  const messages = useMessages(client)

  return (
    <TooltipArrow title={messages.title}>
      {!client ? <Unauthorized /> : <User client={client} />}
    </TooltipArrow>
  )
}

export default OpenProfile
