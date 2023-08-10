import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { useViewer } from 'entities/viewer'
import TooltipArrow from 'shared/ui/TooltipArrow'

const Unauthorized = dynamic(() => import('./unauthorized'))
const User = dynamic(() => import('./user'))

function OpenProfile() {
  const viewer = useViewer()
  const { formatMessage } = useIntl()
  const title = formatMessage({ id: viewer ? 'common.my-page' : 'common.sign-in' })

  return (
    <TooltipArrow title={title}>{!viewer ? <Unauthorized /> : <User user={viewer} />}</TooltipArrow>
  )
}

export default OpenProfile
