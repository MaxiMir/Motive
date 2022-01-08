import React from 'react'
import AppEmoji from 'components/UI/AppEmoji'
import AppGradientButton from 'components/UI/AppGradientButton'

export interface CloseProps {
  tmpl: 'close'
  onClick: () => void
}

export default function Close({ onClick }: CloseProps): JSX.Element {
  return (
    <AppGradientButton startIcon={<AppEmoji name="cancel" onlyEmoji />} onClick={onClick}>
      Cancel
    </AppGradientButton>
  )
}
