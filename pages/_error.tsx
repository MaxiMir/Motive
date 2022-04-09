import { Container, Box, Typography } from '@mui/material'
import useLocale from 'hooks/useLocale'
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
      <Box display="flex" alignItems="center" justifyContent="center" height="100vh">
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="space-between">
          <Typography component="h1" variant="h4">
            {title}
          </Typography>
          <Typography style={{ fontSize: '10em' }}>{statusCode}</Typography>
          <Typography style={{ fontSize: '10em' }}>
            <AppEmoji name="error" onlyEmoji />
          </Typography>
        </Box>
      </Box>
    </Container>
  )
}
