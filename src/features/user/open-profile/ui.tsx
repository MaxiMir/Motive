import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { useClient } from 'entities/user'
import TooltipArrow from 'shared/ui/TooltipArrow'

const Unauthorized = dynamic(() => import('./unauthorized'))
const User = dynamic(() => import('./user'))

export function OpenProfile() {
  const client = useClient()
  const { formatMessage } = useIntl()
  const title = formatMessage({ id: client ? 'common.my-page' : 'common.sign-in' })

  return (
    <TooltipArrow title={title}>
      {!client ? <Unauthorized /> : <User client={client} />}
    </TooltipArrow>
  )
}
