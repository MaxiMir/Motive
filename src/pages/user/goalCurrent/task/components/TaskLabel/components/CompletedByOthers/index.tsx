import { useIntl } from 'react-intl'
import Emoji from 'shared/ui/Emoji'
import TooltipArrow from 'shared/ui/TooltipArrow'

function CompletedByOthers() {
  const { formatMessage } = useIntl()
  const title = formatMessage({ id: 'page.user.competed-by-other.title' })

  return (
    <TooltipArrow title={title}>
      <Emoji name="fire" onlyEmoji />
    </TooltipArrow>
  )
}

export default CompletedByOthers
