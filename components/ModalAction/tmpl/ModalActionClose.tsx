import AppEmoji from 'components/UI/AppEmoji'
import AppGradientButton from 'components/UI/AppGradientButton'

export interface ModalActionCloseProps {
  tmpl: 'close'
  onClick: () => void
}

export default function ModalActionClose({ onClick }: ModalActionCloseProps): JSX.Element {
  return (
    <AppGradientButton startIcon={<AppEmoji name="cancel" onlyEmoji />} onClick={onClick}>
      Cancel
    </AppGradientButton>
  )
}
