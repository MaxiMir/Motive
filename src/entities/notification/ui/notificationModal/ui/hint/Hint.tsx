import { Alert, Button, Stack } from '@mui/material'
import Icon from '@ui/Icon'
import { useMessages } from './lib/hooks/useMessages'

interface HintProps {
  onClick: () => void
}

function Hint({ onClick }: HintProps) {
  const messages = useMessages()

  return (
    <Alert severity="warning" icon={false} sx={{ mb: 3 }}>
      <Stack alignItems="flex-start" spacing={1}>
        {messages.title}:
        <Button startIcon={<Icon name="notifications_active" />} onClick={onClick}>
          {messages.buttonText}
        </Button>
      </Stack>
    </Alert>
  )
}

export default Hint
