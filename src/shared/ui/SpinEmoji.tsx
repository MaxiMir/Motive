import Emoji, { EmojiName } from '@shared/ui/Emoji'

interface SpinIconProps {
  name: EmojiName
}

function SpinEmoji({ name }: SpinIconProps) {
  return (
    <Emoji
      name={name}
      variant="h2"
      sx={{
        animation: 'spin 3.6s linear infinite',
        '@keyframes spin': {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '25%': {
            transform: 'rotate(20deg)',
          },
          '50%': {
            transform: 'rotate(0deg)',
          },
          '75%': {
            transform: 'rotate(-20deg)',
          },
          '100%': {
            transform: 'rotate(0deg)',
          },
        },
      }}
    />
  )
}

export default SpinEmoji
