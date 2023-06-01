import { Alert, Button, Stack } from '@mui/material'
import { useIntl } from 'react-intl'
import Icon from 'shared/ui/Icon'

interface HintProps {
  onClick: () => void
}

function Hint({ onClick }: HintProps) {
  const { formatMessage } = useIntl()
  const title = formatMessage({ id: 'page.user.modal-notification.hint' })
  const buttonText = formatMessage({ id: 'common.turn-on' })

  return (
    <Alert severity="warning" icon={false} sx={{ mb: 3 }}>
      <Stack alignItems="flex-start" gap={1}>
        {title}:
        <Button startIcon={<Icon name="notifications_active" />} onClick={onClick}>
          {buttonText}
        </Button>
      </Stack>
    </Alert>
  )
}

export default Hint
