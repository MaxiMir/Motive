import dynamic from 'next/dynamic'
import { TypographyProps } from '@mui/material'

const Typography = dynamic(() => import('@mui/material/Typography'))

export type EmojiName =
  | 'motivation'
  | 'creativity'
  | 'support'
  | 'completed'
  | 'members'
  | 'abandoned'
  | 'followers'
  | 'motivation-tech'
  | 'following'
  | 'views'
  | 'goal'
  | 'task'
  | 'energy'
  | 'runningDays'
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
  | 'wink'
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
  | 'luggage'
  | 'trending'
  | 'contact'
  | 'first'
  | 'second'
  | 'third'
  | 'bullseye'
  | 'coin'
  | 'moon'
  | 'clock'
  | 'notification'
  | 'question'
  | 'en'
  | 'ru'
  | 'uk'
  | 'zh'
  | 'light'
  | 'system'
  | 'dark'
  | 'barber'
  | 'delete'

interface EmojiProps {
  name: EmojiName
  variant?: TypographyProps['variant']
  className?: string
  onlyEmoji?: boolean
  sx?: TypographyProps['sx']
}

function Emoji({ name, onlyEmoji = false, ...restProps }: EmojiProps) {
  const content = getContent(name)

  return (
    <>
      {onlyEmoji ? (
        content
      ) : (
        <Typography aria-label={name} paragraph m={0} {...restProps}>
          {content}
        </Typography>
      )}
    </>
  )
}

function getContent(name: EmojiName) {
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
    case 'runningDays':
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
      return '👁‍🗨'
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
    case 'wink':
      return '😉'
    case 'tired':
      return '😮‍💨'
    case 'luggage':
      return '🧳'
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
    case 'trending':
      return '👑'
    case 'contact':
      return '📮'
    case 'first':
      return '🥇'
    case 'second':
      return '🥈'
    case 'third':
      return '🥉'
    case 'bullseye':
      return '🫧'
    case 'coin':
      return '🪙'
    case 'moon':
      return '🌒'
    case 'clock':
      return '🕰'
    case 'notification':
      return '🛎'
    case 'question':
      return '❓'
    case 'light':
      return '☀️'
    case 'system':
      return '⚙️'
    case 'dark':
      return '🌑'
    case 'en':
      return '🇺🇸'
    case 'ru':
      return '🇷🇺'
    case 'uk':
      return '🇺🇦'
    case 'zh':
      return '🇨🇳'
    case 'barber':
      return '💈'
    case 'delete':
      return '🗑'
    default:
      return ''
  }
}

export default Emoji
