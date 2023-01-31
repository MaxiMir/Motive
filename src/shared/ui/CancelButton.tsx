import { useIntl } from 'react-intl'
import GradientButton from 'shared/ui/GradientButton'

interface ActionCloseProps {
  onClick: () => void
}

function CancelButton({ onClick }: ActionCloseProps) {
  const { formatMessage } = useIntl()
  const buttonText = formatMessage({ id: 'common.cancel' })

  return (
    <GradientButton size="small" startIcon="🚫" onClick={onClick}>
      {buttonText}
    </GradientButton>
  )
}

export default CancelButton
