import { useTheme, Typography } from '@mui/material'
import { common } from '@mui/material/colors'
import { Locale } from 'hooks/useLocale'
import AppBox from 'components/UI/AppBox'
import i18n from './i18n'

interface SloganProps {
  locale: Locale
}

export default function Slogan({ locale }: SloganProps): JSX.Element {
  const theme = useTheme()
  const { subheader } = i18n[locale]

  return (
    <AppBox alignItems="center" justifyContent="center" sx={{ height: 100, backgroundColor: common.white }}>
      <AppBox flexDirection="column" alignItems="center">
        <Typography
          variant="h4"
          align="center"
          component="h1"
          sx={{
            background: `linear-gradient(90deg, ${theme.characteristic.motivation.main}, ${theme.characteristic.creativity.dark}, ${theme.characteristic.support.dark})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: theme.characteristic.support.dark,
            fontWeight: 500,
          }}
        >
          {process.env.NEXT_PUBLIC_APP_NAME}
        </Typography>
        <Typography variant="caption" align="center" sx={{ color: '#A1A1A6' }}>
          {subheader}
        </Typography>
      </AppBox>
    </AppBox>
  )
}
