import { Box, Tooltip, useTheme } from '@mui/material'
import { Locale } from 'hooks/useLocale'
import AppEmoji from 'components/UI/AppEmoji'
import i18n from './i18n'

interface SupportSignProps {
  name: string
  locale: Locale
}

export default function SupportSign({ name, locale }: SupportSignProps): JSX.Element {
  const theme = useTheme()
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
          background: theme.palette.support.main,
          borderRadius: '50%',
          fontSize: '0.625rem',
        }}
      >
        <AppEmoji name="support" onlyEmoji />
      </Box>
    </Tooltip>
  )
}
