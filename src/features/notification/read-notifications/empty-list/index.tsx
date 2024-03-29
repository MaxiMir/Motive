import { Box, Stack, Typography } from '@mui/material'
import { useIntl } from 'react-intl'
import FadeTypography from 'shared/ui/fade-typography'

function EmptyList() {
  const { formatMessage } = useIntl()
  const title = formatMessage({ id: 'common.nothing-so-far' })

  return (
    <Box display="flex" alignItems="center" height={490}>
      <Stack alignItems="center" gap={2} width="100%">
        <Typography variant="h6" color="primary" component="p" mb={2}>
          {title}
        </Typography>
        <FadeTypography>🛎</FadeTypography>
      </Stack>
    </Box>
  )
}

export default EmptyList
