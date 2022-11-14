import { useIntl } from 'react-intl'
import { Box, Typography } from '@mui/material'
import { MainCharacteristicName } from '@dto'
import AppEmoji, { AppEmojiName } from '@ui/AppEmoji'

interface TabNameProps {
  name: MainCharacteristicName
  emoji: AppEmojiName
}

export default function TabName({ name, emoji }: TabNameProps) {
  const { formatMessage, locale } = useIntl()
  const tabText = formatMessage({ id: `common.${name}` })

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
        {tabText}
      </Typography>
    </Box>
  )
}
