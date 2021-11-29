import React from 'react'
import AppModal from 'components/UI/AppModal'
import AppGradientButton from 'components/UI/AppGradientButton'
import AppEmoji from 'components/UI/AppEmoji'

export interface ModalAuthProps {
  type: 'auth'
  onSuccess: () => void
  onClose: () => void
}

export default function ModalAuth({ onSuccess, onClose }: ModalAuthProps): JSX.Element {
  return (
    <AppModal
      title="Creating a new goal"
      actions={[
        <AppGradientButton startIcon={<AppEmoji name="cancel" onlyEmoji />} onClick={onClose}>
          Cancel
        </AppGradientButton>,
        <AppGradientButton type="submit" disabled={false} onClick={onSuccess}>
          Log in
        </AppGradientButton>,
      ]}
      onClose={onClose}
    >
      ModalAuth
    </AppModal>
  )
}
