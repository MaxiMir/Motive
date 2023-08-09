import { Box, Stack, Typography } from '@mui/material'
import { useIntl } from 'react-intl'
import FadeTypography from 'shared/ui/FadeTypography'

function EmptyList() {
  const { formatMessage } = useIntl()
  const title = formatMessage({ id: 'common.empty' })

  return (
    <Box display="flex" alignItems="center" width="100%" height="100%">
      <Stack alignItems="center" gap={2} width="100%">
        <Typography variant="h6" component="p">
          {title}
        </Typography>
        <FadeTypography>🥷</FadeTypography>
      </Stack>
    </Box>
  )
}

export default EmptyList
