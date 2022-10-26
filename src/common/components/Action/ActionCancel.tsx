import { useIntl } from 'react-intl'
import AppEmoji from '@ui/AppEmoji'
import AppGradientButton from '@ui/AppGradientButton'

export interface ActionCloseProps {
  onClick: () => void
}

export default function ActionCancel({ onClick }: ActionCloseProps) {
  const { formatMessage } = useIntl()
  const buttonText = formatMessage({ id: 'common.cancel' })

  return (
    <AppGradientButton startIcon={<AppEmoji name="cancel" onlyEmoji />} onClick={onClick}>
      {buttonText}
    </AppGradientButton>
  )
}
