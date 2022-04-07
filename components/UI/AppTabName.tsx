import { Typography, useTheme } from '@mui/material'
import i18n from 'constants/i18n'
import { MainCharacteristicName } from 'dto'
import { Locale } from 'hooks/useLocale'
import AppEmoji, { AppEmojiName } from 'components/UI/AppEmoji'
import AppBox from 'components/UI/AppBox'

export interface AppTabNameProps {
  name: MainCharacteristicName
  emoji: AppEmojiName
  locale: Locale
}

export default function AppTabName({ name, emoji, locale }: AppTabNameProps): JSX.Element {
  const theme = useTheme()
  const tabName = i18n[locale][name]

  return (
    <AppBox alignItems="center" gap={1}>
      <AppEmoji name={emoji} variant="h6" />
      <Typography
        sx={{
          textTransform: 'none',
          [theme.breakpoints.only('xs')]: {
            fontSize: locale === 'ru' ? '0.75rem!important' : '0.875rem',
          },
        }}
      >
        {tabName}
      </Typography>
    </AppBox>
  )
}
