import dynamic from 'next/dynamic'
import { Characteristic } from 'dto'
import { AppTypographyProps } from './AppTypography'

const AppTypography = dynamic(() => import('./AppTypography'))

export type AppEmojiName =
  | Characteristic
  | 'favorite-active'
  | 'favorite'
  | 'views'
  | 'goal'
  | 'task'
  | 'task-current'
  | 'runs for days'
  | 'feedback'
  | 'completedByOthers'
  | 'comment'
  | 'photo'
  | 'video'
  | 'violation'
  | 'unsubscribe'

interface AppEmojiProps {
  name: AppEmojiName
  variant?: AppTypographyProps['variant']
  className?: string
  onlyEmoji?: boolean
}

export default function AppEmoji({ name, onlyEmoji = false, ...restProps }: AppEmojiProps): JSX.Element {
  const content = getContent(name)

  return (
    <>
      {onlyEmoji ? (
        content
      ) : (
        <AppTypography component="p" role="img" aria-label={name} {...restProps}>
          {content}
        </AppTypography>
      )}
    </>
  )
}

function getContent(name: AppEmojiName) {
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
    case 'members':
      return '📬'
    case 'favorite-active':
      return '🌟'
    case 'favorite':
      return '⭐'
    case 'goal':
      return '💎'
    case 'task':
      return '📌'
    case 'task-current':
      return '⚡️'
    case 'runs for days':
      return '⏳'
    case 'feedback':
      return '💭'
    case 'completedByOthers':
      return '🔥'
    case 'comment':
      return '💬'
    case 'photo':
      return '📸'
    case 'video':
      return '🎬'
    case 'violation':
      return '👹'
    case 'unsubscribe':
      return '📪'
    default:
      return ''
  }
}
