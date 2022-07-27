import { Box, Typography } from '@mui/material'
import { Locale } from 'hooks/useLocale'
import AppTitle from 'components/ui/AppTitle'
import AppContainer from 'components/ui/AppContainer'
import i18n from './i18n'

interface TopOfTheDayViewProps {
  locale: Locale
}

export default function TopOfTheDayView({ locale }: TopOfTheDayViewProps) {
  const { title, text } = i18n[locale]

  return (
    <AppContainer>
      <AppTitle name="energy" mb={4}>
        {title}
      </AppTitle>
      <Box display="flex" alignItems="center" justifyContent="center" flex={1} height="80vh">
        <Typography variant="h5" component="p">
          {text}
        </Typography>
      </Box>
    </AppContainer>
  )
}
