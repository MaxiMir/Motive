import React from 'react'
import AppEmoji from 'components/UI/AppEmoji'
import AppGradientButton from 'components/UI/AppGradientButton'

interface CloseButtonProps {
  onClick: () => void
}

export default function CloseButton({ onClick }: CloseButtonProps): JSX.Element {
  return (
    <AppGradientButton startIcon={<AppEmoji name="cancel" onlyEmoji />} onClick={onClick}>
      Cancel
    </AppGradientButton>
  )
}
