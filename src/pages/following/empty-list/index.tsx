import { Box, Stack, Typography } from '@mui/material'
import { useIntl } from 'react-intl'
import FadeTypography from 'shared/ui/fade-typography'

function EmptyList() {
  const { formatMessage } = useIntl()
  const title = formatMessage({ id: 'common.empty' })
  const hint = formatMessage({ id: 'page.following.list.hint' })

  return (
    <Box display="flex" alignItems="center" justifyContent="center" flex={1}>
      <Stack alignItems="center" width="100%">
        <Typography variant="h5" component="p" color="primary">
          {title}
        </Typography>
        <Typography mb={2}>{hint}</Typography>
        <FadeTypography>🥷</FadeTypography>
      </Stack>
    </Box>
  )
}

export default EmptyList
