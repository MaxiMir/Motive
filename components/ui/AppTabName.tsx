import { Box, Typography } from '@mui/material'
import i18nCommon from 'constants/i18n'
import { MainCharacteristicName } from 'dto'
import { Locale } from 'hooks/useLocale'
import AppEmoji, { AppEmojiName } from 'components/ui/AppEmoji'

export interface AppTabNameProps {
  name: MainCharacteristicName
  emoji: AppEmojiName
  locale: Locale
}

export default function AppTabName({ name, emoji, locale }: AppTabNameProps) {
  const tabName = i18nCommon[locale][name]

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <AppEmoji name={emoji} variant="h6" />
      <Typography
        sx={(theme) => ({
          textTransform: 'none',
          [theme.breakpoints.only('xs')]: {
            fontSize: locale === 'ru' ? '0.75rem!important' : '0.875rem',
          },
        })}
      >
        {tabName}
      </Typography>
    </Box>
  )
}
