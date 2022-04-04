import { Container } from '@material-ui/core'
import useLocale from 'hooks/useLocale'
import AppBox from 'components/UI/AppBox'
import AppTypography from 'components/UI/AppTypography'
import AppEmoji from 'components/UI/AppEmoji'

const i18n = {
  en: {
    notFound: 'Page Not Found',
    default: 'Something went wrong...',
  },
  ru: {
    notFound: 'Страница не найдена',
    default: 'Что-то пошло не так...',
  },
}

interface CustomErrorProps {
  statusCode?: number
}

export default function CustomError({ statusCode = 500 }: CustomErrorProps): JSX.Element {
  const { locale } = useLocale()
  const errorKey = statusCode === 404 ? 'notFound' : 'default'
  const title = i18n[locale][errorKey]

  return (
    <Container fixed>
      <AppBox alignItems="center" justifyContent="center" height="100vh">
        <AppBox flexDirection="column" alignItems="center" justifyContent="space-between">
          <AppTypography component="h1" variant="h4">
            {title}
          </AppTypography>
          <AppTypography style={{ fontSize: '10em' }}>{statusCode}</AppTypography>
          <AppTypography style={{ fontSize: '10em' }}>
            <AppEmoji name="error" onlyEmoji />
          </AppTypography>
        </AppBox>
      </AppBox>
    </Container>
  )
}
