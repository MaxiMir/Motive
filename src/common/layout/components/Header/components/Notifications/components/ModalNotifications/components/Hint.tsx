import { useIntl } from 'react-intl'
import { Alert, Box, Button } from '@mui/material'
import AppIcon from '@ui/AppIcon'

interface HintProps {
  onClick: () => void
}

function Hint({ onClick }: HintProps) {
  const { formatMessage } = useIntl()
  const title = formatMessage({ id: 'page.user.modal-notification.hint' })
  const buttonText = formatMessage({ id: 'common.turn-on' })

  return (
    <Alert severity="warning" icon={<>{null}</>} sx={{ mb: 4 }}>
      <Box display="flex" flexDirection="column" gap={1} alignItems="flex-start">
        {title}:
        <Button startIcon={<AppIcon name="notifications_active" />} aria-label={buttonText} onClick={onClick}>
          {buttonText}
        </Button>
      </Box>
    </Alert>
  )
}

export default Hint
