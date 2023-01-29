import { Box, Stack, Typography } from '@mui/material'
import { useMessage } from 'shared/lib/hooks'
import FadeEmoji from 'shared/ui/FadeEmoji'

function EmptyList() {
  const title = useMessage('common.nothing-so-far')

  return (
    <Box display="flex" alignItems="center" height={490}>
      <Stack alignItems="center" spacing={2} width="100%">
        <Typography variant="h6" color="primary" component="p" mb={2}>
          {title}
        </Typography>
        <FadeEmoji name="notification" />
      </Stack>
    </Box>
  )
}

export default EmptyList
