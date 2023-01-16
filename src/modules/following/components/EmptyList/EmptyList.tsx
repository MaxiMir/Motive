import { Box, Typography } from '@mui/material'
import AppFadeIcon from '@ui/AppFadeIcon'
import { useMessages } from './hooks/useMessages'

function EmptyList() {
  const messages = useMessages()

  return (
    <Box display="flex" alignItems="center" justifyContent="center" flex={1}>
      <Box display="flex" flexDirection="column" alignItems="center" width="100%">
        <Typography variant="h5" component="p" color="primary">
          {messages.title}
        </Typography>
        <Typography>{messages.hint}</Typography>
        <AppFadeIcon name="followers" />
      </Box>
    </Box>
  )
}

export default EmptyList
