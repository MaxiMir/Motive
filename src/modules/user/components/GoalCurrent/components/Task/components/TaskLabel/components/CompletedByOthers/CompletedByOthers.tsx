import AppEmoji from '@ui/AppEmoji'
import TooltipArrow from '@ui/styled/TooltipArrow'
import { useMessages } from './hooks/useMessages'

function CompletedByOthers() {
  const messages = useMessages()

  return (
    <TooltipArrow title={messages.title}>
      <AppEmoji name="fire" onlyEmoji />
    </TooltipArrow>
  )
}

export default CompletedByOthers
