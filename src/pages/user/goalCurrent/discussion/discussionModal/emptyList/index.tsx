import { Box, Stack, Typography } from '@mui/material'
import { useIntl } from 'react-intl'
import FadeTypography from 'shared/ui/FadeTypography'

function EmptyList() {
  const { formatMessage } = useIntl()
  const nothingText = formatMessage({ id: 'common.nothing' })

  return (
    <Box display="flex" alignItems="center" width="100%" height="100%">
      <Stack alignItems="center" gap={1} width="100%">
        <FadeTypography>💬</FadeTypography>
        <Typography variant="h6" color="primary" component="p">
          {nothingText}
        </Typography>
      </Stack>
    </Box>
  )
}

export default EmptyList
