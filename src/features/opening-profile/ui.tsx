import dynamic from 'next/dynamic'
import { useClient } from 'entities/user'
import { useMessage } from 'shared/lib/hooks'
import { TooltipArrow } from 'shared/ui/styled'

const Unauthorized = dynamic(() => import('./unauthorized'))
const User = dynamic(() => import('./user'))

function OpeningProfile() {
  const client = useClient()
  const title = useMessage(`common.${client ? 'my-page' : 'sign-in'}`)

  return (
    <TooltipArrow title={title}>
      {!client ? <Unauthorized /> : <User client={client} />}
    </TooltipArrow>
  )
}

export default OpeningProfile
