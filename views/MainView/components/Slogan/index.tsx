import { Box, Typography, useTheme } from '@mui/material'
import { Locale } from 'hooks/useLocale'
import i18n from './i18n'

interface SloganProps {
  locale: Locale
}

export default function Slogan({ locale }: SloganProps) {
  const theme = useTheme()
  const { subheader } = i18n[locale]

  return (
    <Box display="flex" alignItems="center" justifyContent="center" flex={1} sx={{ backgroundColor: 'common.white' }}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography
          variant="h4"
          align="center"
          component="h1"
          sx={{
            background: `linear-gradient(90deg, ${theme.palette.motivation.main}, ${theme.palette.creativity.dark}, ${theme.palette.support.dark})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: theme.palette.support.dark,
            fontWeight: 500,
          }}
        >
          {process.env.NEXT_PUBLIC_APP_NAME}
        </Typography>
        <Typography variant="caption" align="center" sx={{ color: '#A1A1A6' }}>
          {subheader}
        </Typography>
      </Box>
    </Box>
  )
}
