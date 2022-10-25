import { Box } from '@mui/material'
import AppEmoji, { AppEmojiName } from 'src/common/ui/AppEmoji'

interface AppSpinIconProps {
  name: AppEmojiName
}

export default function AppFlyIcon({ name }: AppSpinIconProps) {
  return (
    <Box
      sx={{
        height: 180,
        width: 150,
        position: 'relative',
      }}
    >
      <AppEmoji
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
