import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { useClient } from 'entities/user'
import { TooltipArrow } from 'shared/ui/styled'

const Unauthorized = dynamic(() => import('./unauthorized'))
const User = dynamic(() => import('./user'))

function OpeningProfile() {
  const client = useClient()
  const { formatMessage } = useIntl()
  const title = formatMessage({ id: client ? 'common.my-page' : 'common.sign-in' })

  return (
    <TooltipArrow title={title}>
      {!client ? <Unauthorized /> : <User client={client} />}
    </TooltipArrow>
  )
}

export default OpeningProfile
