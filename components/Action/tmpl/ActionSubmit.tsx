import dynamic from 'next/dynamic'
import AppGradientButton from 'components/UI/AppGradientButton'
import { AppEmojiName } from 'components/UI/AppEmoji'

const CircularProgress = dynamic(() => import('@mui/material/CircularProgress'))
const AppEmoji = dynamic(() => import('components/UI/AppEmoji'))

export interface ActionSubmitProps {
  tmpl: 'submit'
  emoji: AppEmojiName
  name: string
  nameLoading: string
  isLoading: boolean
  onClick: () => void
}

export default function ActionSubmit({ emoji, name, nameLoading, isLoading, onClick }: ActionSubmitProps): JSX.Element {
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
