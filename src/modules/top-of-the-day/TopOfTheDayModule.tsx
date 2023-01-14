import { Box, Typography } from '@mui/material'
import AppContainer from '@ui/AppContainer'
import { useMessages } from './hooks/useMessages'

function TopOfTheDayModule() {
  const messages = useMessages()

  return (
    <AppContainer>
      <Typography variant="h1" sx={{ mb: 3 }}>
        {messages.header}
      </Typography>
      <Box display="flex" alignItems="center" justifyContent="center" flex={1} height="80dvh">
        <Typography variant="h5" component="p">
          {messages.text}
        </Typography>
      </Box>
    </AppContainer>
  )
}

export default TopOfTheDayModule
