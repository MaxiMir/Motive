import dynamic from 'next/dynamic'
import GradientButton from 'shared/ui/GradientButton'

const CircularProgress = dynamic(() => import('@mui/material/CircularProgress'))

interface SubmitButtonProps {
  emoji: string
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
      startIcon={disabled ? <CircularProgress size={14.5} color="inherit" /> : emoji}
      onClick={onClick}
    >
      {!disabled ? text : loadingText}
    </GradientButton>
  )
}

export default SubmitButton
