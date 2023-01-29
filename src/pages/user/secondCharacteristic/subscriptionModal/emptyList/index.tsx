import { Box, Stack, Typography } from '@mui/material'
import { useIntl } from 'react-intl'
import FadeEmoji from 'shared/ui/FadeEmoji'

function EmptyList() {
  const { formatMessage } = useIntl()
  const title = formatMessage({ id: 'common.empty' })

  return (
    <Box display="flex" alignItems="center" width="100%" height={490}>
      <Stack alignItems="center" spacing={2} width="100%">
        <Typography variant="h6" component="p">
          {title}
        </Typography>
        <FadeEmoji name="followers" />
      </Stack>
    </Box>
  )
}

export default EmptyList
