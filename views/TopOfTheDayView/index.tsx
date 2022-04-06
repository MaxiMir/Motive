import { Container, Typography } from '@mui/material'
import { Locale } from 'hooks/useLocale'
import AppTitle from 'components/UI/AppTitle'
import AppBox from 'components/UI/AppBox'
import i18n from './i18n'

interface TopOfTheDayViewProps {
  locale: Locale
}

export default function TopOfTheDayView({ locale }: TopOfTheDayViewProps): JSX.Element {
  const { title, text } = i18n[locale]

  return (
    <Container fixed>
      <AppTitle name="energy" mb={4}>
        {title}
      </AppTitle>
      <AppBox alignItems="center" justifyContent="center" flex={1} height="80vh">
        <Typography variant="h5">{text}</Typography>
      </AppBox>
    </Container>
  )
}
