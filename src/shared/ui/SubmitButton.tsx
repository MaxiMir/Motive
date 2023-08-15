import { Button } from '@mui/material'
import dynamic from 'next/dynamic'
import Icon from 'shared/ui/Icon'

const CircularProgress = dynamic(() => import('@mui/material/CircularProgress'))

interface SubmitButtonProps {
  text: string
  loadingText: string
  isLoading: boolean
  onClick: () => void
}

function SubmitButton({ text, loadingText, isLoading, onClick }: SubmitButtonProps) {
  return (
    <Button
      size="small"
      variant="outlined"
      type="submit"
      disabled={isLoading}
      startIcon={
        isLoading ? (
          <CircularProgress size={14.5} color="inherit" />
        ) : (
          <Icon name="done" color="primary.dark" />
        )
      }
      onClick={onClick}
    >
      {!isLoading ? text : loadingText}
    </Button>
  )
}

export default SubmitButton
