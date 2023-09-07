import { useIntl } from 'react-intl'
import { PriorityDto } from 'shared/api'
import PriorityIcon from 'shared/ui/PriorityIcon'
import TooltipArrow from 'shared/ui/TooltipArrow'

interface PriorityProps {
  priority: PriorityDto
}

function Priority({ priority }: PriorityProps) {
  const { formatMessage } = useIntl()
  const title = formatMessage({ id: `common.priority-${priority}` })

  return (
    <TooltipArrow title={title}>
      <PriorityIcon priority={priority} />
    </TooltipArrow>
  )
}

export default Priority
