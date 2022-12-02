import { Box, Typography } from '@mui/material'
import AppHeader from '@ui/AppHeader'
import AppContainer from '@ui/AppContainer'
import useMessages from './hooks/useMessages'

function TopOfTheDayModule() {
  const messages = useMessages()

  return (
    <AppContainer>
      <AppHeader name="energy" mb={4}>
        {messages.header}
      </AppHeader>
      <Box display="flex" alignItems="center" justifyContent="center" flex={1} height="80vh">
        <Typography variant="h5" component="p">
          {messages.text}
        </Typography>
      </Box>
    </AppContainer>
  )
}

export default TopOfTheDayModule
