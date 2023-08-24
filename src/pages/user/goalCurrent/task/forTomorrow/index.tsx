import { useIntl } from 'react-intl'
import Icon from 'shared/ui/Icon'
import TooltipArrow from 'shared/ui/TooltipArrow'

function ForTomorrow() {
  const { formatMessage } = useIntl()
  const title = formatMessage({ id: 'component.tooltip.tomorrow' })

  return (
    <TooltipArrow title={title}>
      <Icon name="update" fontSize={16} />
    </TooltipArrow>
  )
}
export default ForTomorrow
