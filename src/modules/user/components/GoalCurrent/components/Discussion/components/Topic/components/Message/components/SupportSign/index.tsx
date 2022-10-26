import { Box, Tooltip } from '@mui/material'
import { Locale } from '@hooks/useSetLocale'
import AppEmoji from '@ui/AppEmoji'
import i18n from './i18n'

interface SupportSignProps {
  name: string
  locale: Locale
}

export default function SupportSign({ name, locale }: SupportSignProps) {
  const { getTitle } = i18n[locale]
  const title = getTitle(name)

  return (
    <Tooltip arrow title={title} aria-label={title}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          width: 21,
          height: 21,
          backgroundColor: 'support.main',
          borderRadius: '50%',
          fontSize: '0.625rem',
        }}
      >
        <AppEmoji name="support" onlyEmoji />
      </Box>
    </Tooltip>
  )
}
