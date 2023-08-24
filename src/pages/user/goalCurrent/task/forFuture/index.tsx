import { useIntl } from 'react-intl'
import Icon from 'shared/ui/Icon'
import TooltipArrow from 'shared/ui/TooltipArrow'

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
