import Emoji from '@ui/Emoji'
import TooltipArrow from '@ui/styled/TooltipArrow'
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
