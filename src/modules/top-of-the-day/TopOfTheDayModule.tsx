import { Stack, Typography } from '@mui/material'
import AppContainer from '@ui/AppContainer'
import AppFadeIcon from '@ui/AppFadeIcon'
import { useMessages } from './hooks/useMessages'

function TopOfTheDayModule() {
  const messages = useMessages()

  return (
    <AppContainer>
      <Typography variant="h1" sx={{ mb: 3 }}>
        {messages.header}
      </Typography>
      <Stack alignItems="center" spacing={2} flex={1} height="80dvh">
        <Typography variant="h5" component="p" color="primary">
          {messages.text}
        </Typography>
        <AppFadeIcon name="keyboard" />
      </Stack>
    </AppContainer>
  )
}

export default TopOfTheDayModule
