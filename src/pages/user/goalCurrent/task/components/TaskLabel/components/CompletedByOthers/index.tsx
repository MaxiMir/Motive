import { useIntl } from 'react-intl'
import TooltipArrow from 'shared/ui/TooltipArrow'

function CompletedByOthers() {
  const { formatMessage } = useIntl()
  const title = formatMessage({ id: 'page.user.competed-by-other.title' })

  return <TooltipArrow title={title}>🔥</TooltipArrow>
}

export default CompletedByOthers
