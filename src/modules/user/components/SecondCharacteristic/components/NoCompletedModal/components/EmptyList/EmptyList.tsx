import { Box, Typography } from '@mui/material'
import AppSpinIcon from '@ui/AppSpinIcon'
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
      <Typography color="zen.tender" variant="h6">
        {messages.title}
      </Typography>
      <AppSpinIcon name="completed" />
    </Box>
  )
}

export default EmptyList
