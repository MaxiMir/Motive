import { Box, Typography } from '@mui/material'
import useLocale from 'hooks/useLocale'
import AppEmoji from 'components/UI/AppEmoji'
import AppContainer from 'components/UI/AppContainer'

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
    <AppContainer>
      <Box display="flex" alignItems="center" justifyContent="center" height="calc(100vh - 125px)">
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="space-between">
          <Typography component="h1" variant="h5">
            {title}
          </Typography>
          <Typography sx={{ fontSize: '9em' }}>{statusCode}</Typography>
          <Typography sx={{ fontSize: '9em' }}>
            <AppEmoji name="error" onlyEmoji />
          </Typography>
        </Box>
      </Box>
    </AppContainer>
  )
}
