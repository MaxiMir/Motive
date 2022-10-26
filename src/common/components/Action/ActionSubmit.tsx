import dynamic from 'next/dynamic'
import AppGradientButton from '@ui/AppGradientButton'
import { AppEmojiName } from '@ui/AppEmoji'

const CircularProgress = dynamic(() => import('@mui/material/CircularProgress'))
const AppEmoji = dynamic(() => import('@ui/AppEmoji'))

export interface ActionSubmitProps {
  emoji: AppEmojiName
  text: string
  loadingText: string
  isLoading: boolean
  onClick: () => void
}

export default function ActionSubmit({ emoji, text, loadingText, isLoading, onClick }: ActionSubmitProps) {
  return (
    <AppGradientButton
      type="submit"
      disabled={isLoading}
      startIcon={isLoading ? <CircularProgress size="0.9rem" color="inherit" /> : <AppEmoji name={emoji} onlyEmoji />}
      onClick={onClick}
    >
      {!isLoading ? text : loadingText}
    </AppGradientButton>
  )
}
