import { Button } from '@mui/material'
import { useIntl } from 'react-intl'
import Icon from 'shared/ui/Icon'

interface CancelButtonProps {
  onClick: () => void
}

function CancelButton({ onClick }: CancelButtonProps) {
  const { formatMessage } = useIntl()
  const buttonText = formatMessage({ id: 'common.cancel' })

  return (
    <Button
      size="small"
      variant="outlined"
      startIcon={<Icon name="block" color="error.light" />}
      onClick={onClick}
    >
      {buttonText}
    </Button>
  )
}

export default CancelButton
