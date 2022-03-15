import AppEmoji from 'components/UI/AppEmoji'
import AppGradientButton from 'components/UI/AppGradientButton'

export interface ActionCloseProps {
  tmpl: 'close'
  onClick: () => void
}

export default function ActionClose({ onClick }: ActionCloseProps): JSX.Element {
  return (
    <AppGradientButton startIcon={<AppEmoji name="cancel" onlyEmoji />} onClick={onClick}>
      Cancel
    </AppGradientButton>
  )
}
