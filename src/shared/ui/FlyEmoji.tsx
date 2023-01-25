import { Box } from '@mui/material'
import Emoji, { EmojiName } from '@shared/ui/Emoji'

interface SpinIconProps {
  name: EmojiName
}

function FlyEmoji({ name }: SpinIconProps) {
  return (
    <Box position="relative" width={150} height={180}>
      <Emoji
        name={name}
        variant="h2"
        sx={{
          position: 'absolute',
          transform: 'rotate(-45deg)',
          bottom: 0,
          left: 45,
          animation: 'fly 6s linear infinite',
          '@keyframes fly': {
            '0%': {
              bottom: 0,
            },
            '50%': {
              bottom: '25%',
            },
            '75%': {
              bottom: '50%',
              opacity: 0.7,
            },
            '100%': {
              bottom: '60%',
              opacity: 0,
            },
          },
        }}
      />
    </Box>
  )
}

export default FlyEmoji
