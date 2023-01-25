import Emoji from '@shared/ui/Emoji'
import GradientButton from '@shared/ui/GradientButton'
import { useIntl } from 'react-intl'

interface ActionCloseProps {
  onClick: () => void
}

function CancelButton({ onClick }: ActionCloseProps) {
  const { formatMessage } = useIntl()
  const buttonText = formatMessage({ id: 'common.cancel' })

  return (
    <GradientButton size="small" startIcon={<Emoji name="cancel" onlyEmoji />} onClick={onClick}>
      {buttonText}
    </GradientButton>
  )
}

export default CancelButton
