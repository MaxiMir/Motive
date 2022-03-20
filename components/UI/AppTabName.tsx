import AppEmoji, { AppEmojiName } from 'components/UI/AppEmoji'
import AppBox from 'components/UI/AppBox'
import AppTypography from 'components/UI/AppTypography'

export interface AppTabNameProps {
  name: string
  emoji: AppEmojiName
}

export default function AppTabName({ name, emoji }: AppTabNameProps): JSX.Element {
  return (
    <AppBox alignItems="center" spacing={1}>
      <AppEmoji name={emoji} variant="h6" />
      <AppTypography style={{ textTransform: 'none' }}>{name}</AppTypography>
    </AppBox>
  )
}
