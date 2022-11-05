import AppEmoji, { AppEmojiName } from '@ui/AppEmoji'

interface AppSpinIconProps {
  name: AppEmojiName
}

export default function AppSpinIcon({ name }: AppSpinIconProps) {
  return (
    <AppEmoji
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
