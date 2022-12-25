import { Box, Typography } from '@mui/material'
import AppFadeIcon from '@ui/AppFadeIcon'
import { useMessages } from './hooks/useMessages'

function EmptyList() {
  const messages = useMessages()

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      flex={1}
      gap={2}
    >
      <Typography variant="h6" color="zen.tender">
        {messages.title}
      </Typography>
      <AppFadeIcon name="followers" />
    </Box>
  )
}

export default EmptyList
