import dynamic from 'next/dynamic'
import { Characteristic } from 'dto'
import { AppTypographyProps } from './AppTypography'

const AppTypography = dynamic(() => import('./AppTypography'))

export type AppEmojiName =
  | Characteristic
  | 'motivation-tech'
  | 'favorite'
  | 'views'
  | 'goal'
  | 'task'
  | 'energy'
  | 'runs for days'
  | 'feedback'
  | 'completedByOthers'
  | 'discussion'
  | 'photo'
  | 'video'
  | 'violation'
  | 'subscribe'
  | 'unsubscribe'
  | 'death'
  | 'ninja'
  | 'robot'
  | 'magic'
  | 'keyboard'
  | 'cancel'
  | 'like'
  | 'cup'
  | 'finish'

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
    case 'motivation-tech':
      return '🦾️'
    case 'creativity':
      return '🧠'
    case 'support':
      return '🙏'
    case 'awards':
      return '🎖'
    case 'completed':
      return '🏆'
    case 'abandoned':
      return '🕸'
    case 'members':
      return '📬'
    case 'favorite':
      return '⭐'
    case 'goal':
      return '💎'
    case 'task':
      return '📌'
    case 'energy':
      return '⚡️'
    case 'runs for days':
      return '⏳'
    case 'feedback':
      return '💭'
    case 'completedByOthers':
      return '🔥'
    case 'discussion':
      return '💬'
    case 'photo':
      return '📸'
    case 'video':
      return '🎬'
    case 'violation':
      return '👹'
    case 'subscribe':
      return '📬'
    case 'unsubscribe':
      return '📪'
    case 'death':
      return '☠️'
    case 'ninja':
      return '🥷‍'
    case 'robot':
      return '🤖‍'
    case 'magic':
      return '✨'
    case 'keyboard':
      return '⌨️'
    case 'cancel':
      return '🚫'
    case 'like':
      return '❤️'
    case 'finish':
      return '💫'
    case 'cup':
      return '🏆'
    default:
      return ''
  }
}
