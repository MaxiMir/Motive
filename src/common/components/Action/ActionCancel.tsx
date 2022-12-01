import { useIntl } from 'react-intl'
import AppEmoji from '@ui/AppEmoji'
import AppGradientButton from '@ui/AppGradientButton'

interface ActionCloseProps {
  onClick: () => void
}

function ActionCancel({ onClick }: ActionCloseProps) {
  const { formatMessage } = useIntl()
  const buttonText = formatMessage({ id: 'common.cancel' })

  return (
    <AppGradientButton startIcon={<AppEmoji name="cancel" onlyEmoji />} onClick={onClick}>
      {buttonText}
    </AppGradientButton>
  )
}

export default ActionCancel
