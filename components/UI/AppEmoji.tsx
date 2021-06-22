import { Variant } from '@material-ui/core/styles/createTypography'
import { Typography } from '@material-ui/core/'
import { Characteristic } from 'dto'

export type AppEmojiName = Characteristic | 'favorite-active' | 'favorite'

interface AppEmojiProps {
  name: AppEmojiName
  variant: Variant
}

const AppEmoji = ({ name, variant }: AppEmojiProps) => {
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
      default:
        return ''
    }
  }

  return (
    <Typography variant={variant} component="p">
      {content}
    </Typography>
  )
}

export default AppEmoji
