import { Box, Typography } from '@mui/material'
import useLocale from 'hooks/useLocale'
import AppEmoji from 'components/ui/AppEmoji'
import AppContainer from 'components/ui/AppContainer'

const i18n = {
  en: {
    notFound: 'Page Not Found',
    default: 'Something went wrong...',
  },
  ru: {
    notFound: 'Страница не найдена',
    default: 'Что-то пошло не так...',
  },
  uk: {
    notFound: 'Сторінку не знайдено',
    default: 'Щось пішло не так...',
  },
}

interface CustomErrorProps {
  statusCode?: number
}

export default function CustomError({ statusCode = 500 }: CustomErrorProps) {
  const { locale } = useLocale()
  const errorKey = statusCode === 404 ? 'notFound' : 'default'
  const title = i18n[locale][errorKey]

  return (
    <AppContainer>
      <Box display="flex" alignItems="center" justifyContent="center" flex={1}>
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
