import { Stack, Typography } from '@mui/material'
import AppSpinIcon from '@ui/AppSpinIcon'
import { useMessages } from './hooks/useMessages'

function EmptyList() {
  const messages = useMessages()

  return (
    <Stack alignItems="center" justifyContent="center" flex={1} spacing={2}>
      <Typography color="zen.tender" variant="h6">
        {messages.title}
      </Typography>
      <AppSpinIcon name="completed" />
    </Stack>
  )
}

export default EmptyList
