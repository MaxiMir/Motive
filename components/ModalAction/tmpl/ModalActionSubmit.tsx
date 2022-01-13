import React from 'react'
import dynamic from 'next/dynamic'
import AppGradientButton from 'components/UI/AppGradientButton'
import { AppEmojiName } from 'components/UI/AppEmoji'

const CircularProgress = dynamic(() => import('@material-ui/core/CircularProgress'))
const AppEmoji = dynamic(() => import('components/UI/AppEmoji'))

export interface ModalActionSubmitProps {
  tmpl: 'submit'
  emoji: AppEmojiName
  name: string
  nameLoading: string
  isLoading: boolean
  onClick: () => void
}

export default function ModalActionSubmit({
  emoji,
  name,
  nameLoading,
  isLoading,
  onClick,
}: ModalActionSubmitProps): JSX.Element {
  return (
    <AppGradientButton
      type="submit"
      disabled={isLoading}
      startIcon={isLoading ? <CircularProgress size="0.9rem" color="primary" /> : <AppEmoji name={emoji} onlyEmoji />}
      onClick={onClick}
    >
      {!isLoading ? name : nameLoading}
    </AppGradientButton>
  )
}
