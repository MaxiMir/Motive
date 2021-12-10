import React from 'react'
import dynamic from 'next/dynamic'
import AppGradientButton from 'components/UI/AppGradientButton'

const CircularProgress = dynamic(() => import('@material-ui/core/CircularProgress'))
const AppEmoji = dynamic(() => import('components/UI/AppEmoji'))

interface SubmitButtonProps {
  isLoading: boolean
  onClick: () => void
}

export default function SubmitButton({ isLoading, onClick }: SubmitButtonProps): JSX.Element {
  return (
    <AppGradientButton
      type="submit"
      disabled={isLoading}
      startIcon={isLoading ? <CircularProgress size="0.9rem" color="primary" /> : <AppEmoji name="goal" onlyEmoji />}
      onClick={onClick}
    >
      {isLoading ? 'Creating' : 'Create'}
    </AppGradientButton>
  )
}
