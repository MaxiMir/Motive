import { Box, Typography } from '@mui/material'
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
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        flex={1}
        gap={1}
        height="80dvh"
      >
        <Typography variant="h5" component="p" color="primary">
          {messages.text}
        </Typography>
        <AppFadeIcon name="keyboard" />
      </Box>
    </AppContainer>
  )
}

export default TopOfTheDayModule
