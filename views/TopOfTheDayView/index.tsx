import { Container } from '@material-ui/core'
import { Locale } from 'hooks/useLocale'
import AppTitle from 'components/UI/AppTitle'
import AppTypography from 'components/UI/AppTypography'
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
        <AppTypography variant="h5">{text}</AppTypography>
      </AppBox>
    </Container>
  )
}
