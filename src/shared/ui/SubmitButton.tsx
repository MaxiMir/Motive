import dynamic from 'next/dynamic'
import GradientButton from '@ui/GradientButton'
import { EmojiName } from '@ui/Emoji'

const CircularProgress = dynamic(() => import('@mui/material/CircularProgress'))
const Emoji = dynamic(() => import('@ui/Emoji'))

interface SubmitButtonProps {
  emoji: EmojiName
  text: string
  loadingText: string
  disabled: boolean
  onClick: () => void
}

function SubmitButton({ emoji, text, loadingText, disabled, onClick }: SubmitButtonProps) {
  return (
    <GradientButton
      size="small"
      type="submit"
      disabled={disabled}
      startIcon={
        disabled ? (
          <CircularProgress size={14.5} color="inherit" />
        ) : (
          <Emoji name={emoji} onlyEmoji />
        )
      }
      onClick={onClick}
    >
      {!disabled ? text : loadingText}
    </GradientButton>
  )
}

export default SubmitButton
