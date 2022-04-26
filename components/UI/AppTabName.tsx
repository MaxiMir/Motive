import { Box, Typography, useTheme } from '@mui/material'
import i18n from 'constants/i18n'
import { MainCharacteristicName } from 'dto'
import { Locale } from 'hooks/useLocale'
import AppEmoji, { AppEmojiName } from 'components/UI/AppEmoji'

export interface AppTabNameProps {
  name: MainCharacteristicName
  emoji: AppEmojiName
  locale: Locale
}

export default function AppTabName({ name, emoji, locale }: AppTabNameProps) {
  const theme = useTheme()
  const tabName = i18n[locale][name]

  return (
    <Box display="flex" alignItems="center" gap={1}>
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
    </Box>
  )
}
