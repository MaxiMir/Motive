import { Box, Button, Stack, Typography } from '@mui/material'
import { useIntl } from 'react-intl'
import { useRouter } from 'next/router'
import Container from 'shared/ui/container'
import FadeTypography from 'shared/ui/fade-typography'

interface ErrorPageProps {
  header?: string
}

export function ErrorPage({ header }: ErrorPageProps) {
  const router = useRouter()
  const { formatMessage } = useIntl()
  const headerFinal = header || formatMessage({ id: 'common.error' })
  const backText = formatMessage({ id: 'common.back' })

  const onClick = () => router.back()

  return (
    <Container>
      <Box display="flex" alignItems="center" justifyContent="center" flex={1}>
        <Stack alignItems="center" gap={1}>
          <FadeTypography fontSize="9em">👺</FadeTypography>
          <Typography component="h1" variant="h5" textAlign="center">
            {headerFinal}
          </Typography>
          <Button sx={{ color: 'warning.light' }} onClick={onClick}>
            {backText}
          </Button>
        </Stack>
      </Box>
    </Container>
  )
}
