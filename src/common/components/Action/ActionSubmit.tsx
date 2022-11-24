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

export default function ActionSubmit({ emoji, text, loadingText, disabled, onClick }: ActionSubmitProps) {
  return (
    <AppGradientButton
      type="submit"
      disabled={disabled}
      startIcon={disabled ? <CircularProgress size="0.9rem" color="inherit" /> : <AppEmoji name={emoji} onlyEmoji />}
      onClick={onClick}
    >
      {!disabled ? text : loadingText}
    </AppGradientButton>
  )
}
