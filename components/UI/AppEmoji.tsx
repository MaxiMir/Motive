import dynamic from 'next/dynamic'
import { GoalCharacteristicName, UserCharacteristicName } from 'dto'
import { AppTypographyProps } from './AppTypography'

const AppTypography = dynamic(() => import('./AppTypography'))

export type AppEmojiName =
  | UserCharacteristicName
  | GoalCharacteristicName
  | 'motivation-tech'
  | 'following'
  | 'views'
  | 'goal'
  | 'task'
  | 'energy'
  | 'runs for days'
  | 'feedback'
  | 'completedBy'
  | 'discussion'
  | 'photo'
  | 'video'
  | 'error'
  | 'subscribe'
  | 'unsubscribe'
  | 'ninja'
  | 'speaker'
  | 'magic'
  | 'keyboard'
  | 'cancel'
  | 'like'
  | 'cup'
  | 'finish'
  | 'congratulations'
  | 'tape'
  | 'cassette'
  | 'pitt'

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
    case 'completed':
      return '🏆'
    case 'abandoned':
      return '🕸'
    case 'members':
      return '📬'
    case 'followers':
    case 'following':
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
    case 'completedBy':
      return '🔥'
    case 'discussion':
      return '💬'
    case 'photo':
      return '📸'
    case 'video':
      return '🎬'
    case 'error':
      return '👺'
    case 'subscribe':
      return '📬'
    case 'unsubscribe':
      return '📪'
    case 'ninja':
      return '🥷‍'
    case 'speaker':
      return '🧞‍♂️‍'
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
    case 'views':
      return '👣'
    case 'congratulations':
      return '🎉'
    case 'tape':
      return '🎞'
    case 'cassette':
      return '📼'
    case 'pitt':
      return '🕷'
    default:
      return ''
  }
}
