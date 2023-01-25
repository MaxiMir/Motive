import Emoji, { EmojiName } from '@shared/ui/Emoji'

interface FadeEmojiProps {
  name: EmojiName
}

function FadeEmoji({ name }: FadeEmojiProps) {
  return (
    <Emoji
      name={name}
      variant="h2"
      sx={{
        animation: 'fade 1.4s cubic-bezier(0.550, 0.085, 0.680, 0.530) both',
        '@keyframes fade': {
          from: {
            filter: 'blur(12px)',
            opacity: 0,
          },
          to: {
            filter: 'blur(0px)',
            opacity: 1,
          },
        },
      }}
    />
  )
}

export default FadeEmoji
