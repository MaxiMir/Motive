import { Alert, Box, Button } from '@mui/material'
import AppIcon from '@ui/AppIcon'
import { useMessages } from './hooks/useMessages'

interface HintProps {
  onClick: () => void
}

function Hint({ onClick }: HintProps) {
  const messages = useMessages()

  return (
    <Alert severity="warning" icon={<>{null}</>} sx={{ mb: 3 }}>
      <Box display="flex" flexDirection="column" gap={1} alignItems="flex-start">
        {messages.title}:
        <Button startIcon={<AppIcon name="notifications_active" />} onClick={onClick}>
          {messages.buttonText}
        </Button>
      </Box>
    </Alert>
  )
}

export default Hint
