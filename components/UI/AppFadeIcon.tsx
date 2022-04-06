import AppEmoji, { AppEmojiName } from 'components/UI/AppEmoji'

interface AppSpinIconProps {
  name: AppEmojiName
}

export default function AppFadeIcon({ name }: AppSpinIconProps): JSX.Element {
  return (
    <AppEmoji
      name={name}
      variant="h2"
      sx={{
        animation: 'fade 1.4s cubic-bezier(0.550, 0.085, 0.680, 0.530) both',
        '@keyframes fade': {
          '0%': {
            filter: 'blur(12px)',
            opacity: 0,
          },
          '100%': {
            filter: 'blur(0px)',
            opacity: 1,
          },
        },
      }}
    />
  )
}
