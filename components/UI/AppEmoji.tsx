import { Characteristic } from 'dto'
import AppTypography, { AppTypographyProps } from './AppTypography'

export type AppEmojiName = Characteristic | 'favorite-active' | 'favorite' | 'views' | 'goal' | 'task' | 'runs for days'

interface AppEmojiProps {
  name: AppEmojiName
  variant: AppTypographyProps['variant']
  className?: string
}

export default function AppEmoji({ name, ...restProps }: AppEmojiProps): JSX.Element {
  const content = getContent()

  function getContent() {
    switch (name) {
      case 'motivation':
        return '💪'
      case 'creativity':
        return '🧠'
      case 'support':
        return '🙏'
      case 'completed':
        return '🏆'
      case 'abandoned':
        return '🕸'
      case 'favorite-active':
        return '🌟'
      case 'favorite':
        return '⭐'
      case 'goal':
        return '💎'
      case 'task':
        return '📌'
      case 'runs for days':
        return '⏳'
      default:
        return ''
    }
  }

  return (
    <AppTypography component="p" role="img" aria-label={name} {...restProps}>
      {content}
    </AppTypography>
  )
}
