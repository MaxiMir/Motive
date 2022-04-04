import i18n from 'constants/i18n'
import { Locale } from 'hooks/useLocale'
import AppEmoji, { AppEmojiName } from 'components/UI/AppEmoji'
import AppBox from 'components/UI/AppBox'
import AppTypography from 'components/UI/AppTypography'
import { MainCharacteristicName } from 'dto'

export interface AppTabNameProps {
  name: MainCharacteristicName
  emoji: AppEmojiName
  locale: Locale
}

export default function AppTabName({ name, emoji, locale }: AppTabNameProps): JSX.Element {
  const text = i18n[locale][name]

  return (
    <AppBox alignItems="center" spacing={1}>
      <AppEmoji name={emoji} variant="h6" />
      <AppTypography style={{ textTransform: 'none' }}>{text}</AppTypography>
    </AppBox>
  )
}
