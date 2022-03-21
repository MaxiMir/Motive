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
  | 'fire'
  | 'discussion'
  | 'photo'
  | 'video'
  | 'error'
  | 'join'
  | 'leave'
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
  | 'stage'
  | 'tired'
  | 'save'
  | 'switch'
  | 'bug'
  | 'search'
  | 'serenity'
  | 'blast'
  | 'knot'
  | 'helmet'
  | 'blood'
  | 'web'
  | 'scared'
  | 'popular'
  | 'contact'

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
      return '🥷'
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
    case 'fire':
      return '🔥'
    case 'discussion':
      return '💬'
    case 'photo':
      return '📸'
    case 'video':
      return '🎬'
    case 'error':
      return '👺'
    case 'join':
      return '📬'
    case 'leave':
      return '📪'
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
    case 'save':
      return '💾'
    case 'pitt':
      return '🕷'
    case 'stage':
      return '🚀'
    case 'tired':
      return '😮‍💨'
    case 'switch':
      return '🕹'
    case 'bug':
      return '👾'
    case 'search':
      return '🔍'
    case 'serenity':
      return '🗻'
    case 'blast':
      return '🌋'
    case 'knot':
      return '🪢'
    case 'helmet':
      return '⛑'
    case 'blood':
      return '🩸'
    case 'web':
      return '🕸'
    case 'scared':
      return '😱'
    case 'popular':
      return '📃'
    case 'contact':
      return '📮'
    default:
      return ''
  }
}
