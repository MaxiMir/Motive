import dynamic from 'next/dynamic'
import AppGradientButton from 'components/ui/AppGradientButton'
import { AppEmojiName } from 'components/ui/AppEmoji'

const CircularProgress = dynamic(() => import('@mui/material/CircularProgress'))
const AppEmoji = dynamic(() => import('components/ui/AppEmoji'))

export interface ActionSubmitProps {
  emoji: AppEmojiName
  name: string
  nameLoading: string
  isLoading: boolean
  onClick: () => void
}

export default function ActionSubmit({ emoji, name, nameLoading, isLoading, onClick }: ActionSubmitProps) {
  return (
    <AppGradientButton
      type="submit"
      disabled={isLoading}
      startIcon={isLoading ? <CircularProgress size="0.9rem" color="inherit" /> : <AppEmoji name={emoji} onlyEmoji />}
      onClick={onClick}
    >
      {!isLoading ? name : nameLoading}
    </AppGradientButton>
  )
}
