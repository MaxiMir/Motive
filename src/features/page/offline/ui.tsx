import { Box, Button, Stack, Typography } from '@mui/material'
import { useIntl } from 'react-intl'
import { useRouter } from 'next/router'
import Container from 'shared/ui/Container'
import FadeTypography from 'shared/ui/FadeTypography'

function Offline() {
  const { reload } = useRouter()
  const { formatMessage } = useIntl()
  const header = formatMessage({ id: 'common.offline' })
  const description = formatMessage({ id: 'common-check-connection' })
  const reloadText = formatMessage({ id: 'common.reload' })

  return (
    <Container>
      <Box display="flex" alignItems="center" justifyContent="center" flex={1} height="100%">
        <Stack alignItems="center" gap={1}>
          <FadeTypography fontSize="9em">📡</FadeTypography>
          <Typography component="h1" variant="h5">
            {header}
          </Typography>
          <Typography>{description}</Typography>
          <Button sx={{ color: 'warning.light' }} onClick={reload}>
            {reloadText}
          </Button>
        </Stack>
      </Box>
    </Container>
  )
}

export default Offline
