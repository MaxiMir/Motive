import dynamic from 'next/dynamic'
import AppGradientButton from '@ui/AppGradientButton'
import { AppEmojiName } from '@ui/AppEmoji'

const CircularProgress = dynamic(() => import('@mui/material/CircularProgress'))
const AppEmoji = dynamic(() => import('@ui/AppEmoji'))

interface ActionSubmitProps {
  emoji: AppEmojiName
  text: string
  loadingText: string
  disabled: boolean
  onClick: () => void
}

function ActionSubmit({ emoji, text, loadingText, disabled, onClick }: ActionSubmitProps) {
  return (
    <AppGradientButton
      size="small"
      type="submit"
      disabled={disabled}
      startIcon={
        disabled ? (
          <CircularProgress size={14.5} color="inherit" />
        ) : (
          <AppEmoji name={emoji} onlyEmoji />
        )
      }
      onClick={onClick}
    >
      {!disabled ? text : loadingText}
    </AppGradientButton>
  )
}

export default ActionSubmit
