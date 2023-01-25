import Emoji from '@shared/ui/Emoji'
import { TooltipArrow } from '@shared/ui/styled'
import { useMessages } from './hooks/useMessages'

function CompletedByOthers() {
  const messages = useMessages()

  return (
    <TooltipArrow title={messages.title}>
      <Emoji name="fire" onlyEmoji />
    </TooltipArrow>
  )
}

export default CompletedByOthers
