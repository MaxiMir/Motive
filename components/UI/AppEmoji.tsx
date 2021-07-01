import { Variant } from '@material-ui/core/styles/createTypography'
import { Typography } from '@material-ui/core/'
import { Characteristic } from 'dto'

export type AppEmojiName = Characteristic | 'favorite-active' | 'favorite' | 'views' | 'goal'

interface AppEmojiProps {
  name: AppEmojiName
  variant: Variant
  className?: string
}

export default function AppEmoji({ name, variant, ...restProps }: AppEmojiProps): JSX.Element {
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
      default:
        return ''
    }
  }

  return (
    <Typography variant={variant} component="p" role="img" aria-label={name} {...restProps}>
      {content}
    </Typography>
  )
}
