import { useRouter } from 'next/router'
import { useIntl } from 'react-intl'
import { Box, Button, Typography } from '@mui/material'
import AppEmoji from 'src/common/ui/AppEmoji'
import AppContainer from 'src/common/ui/AppContainer'

interface CustomErrorProps {
  statusCode?: number
}

export default function Error({ statusCode = 500 }: CustomErrorProps) {
  const { formatMessage } = useIntl()
  const router = useRouter()
  const headerMessageId = statusCode === 404 ? 'page.404.title' : 'common.error'
  const header = formatMessage({ id: headerMessageId })
  const backText = formatMessage({ id: 'common.back' })

  const onClick = () => router.back()

  return (
    <AppContainer>
      <Box display="flex" alignItems="center" justifyContent="center" flex={1}>
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="space-between">
          <Typography component="h1" variant="h5">
            {header}
          </Typography>
          <Typography sx={{ fontSize: '9em' }}>{statusCode}</Typography>
          <Typography sx={{ fontSize: '9em' }}>
            <AppEmoji name="error" onlyEmoji />
          </Typography>
          <Button
            aria-label={backText}
            sx={{
              color: 'warning.light',
            }}
            onClick={onClick}
          >
            {backText}
          </Button>
        </Box>
      </Box>
    </AppContainer>
  )
}
