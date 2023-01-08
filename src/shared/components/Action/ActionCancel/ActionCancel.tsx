import AppEmoji from '@ui/AppEmoji'
import AppGradientButton from '@ui/AppGradientButton'
import { useMessages } from './hooks/useMessages'

interface ActionCloseProps {
  onClick: () => void
}

function ActionCancel({ onClick }: ActionCloseProps) {
  const messages = useMessages()

  return (
    <AppGradientButton
      size="small"
      startIcon={<AppEmoji name="cancel" onlyEmoji />}
      onClick={onClick}
    >
      {messages.buttonText}
    </AppGradientButton>
  )
}

export default ActionCancel
