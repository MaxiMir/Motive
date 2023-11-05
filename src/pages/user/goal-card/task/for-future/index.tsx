import { useIntl } from 'react-intl'
import Icon from 'shared/ui/icon'
import TooltipArrow from 'shared/ui/tooltip-arrow'

function ForFuture() {
  const { formatMessage } = useIntl()
  const title = formatMessage({ id: 'component.available-later' })

  return (
    <TooltipArrow title={title}>
      <Icon name="update" fontSize={16} />
    </TooltipArrow>
  )
}
export default ForFuture
