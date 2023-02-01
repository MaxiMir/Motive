import { useIntl } from 'react-intl'
import TooltipArrow from 'shared/ui/TooltipArrow'

function CompletedByOthers() {
  const { formatMessage } = useIntl()
  const title = formatMessage({ id: 'page.user.competed-by-other.title' })

  return (
    <TooltipArrow title={title}>
      <span>🔥</span>
    </TooltipArrow>
  )
}

export default CompletedByOthers
