import { useIntl } from 'react-intl'
import { Box, Typography } from '@mui/material'
import AppHeader from '@ui/AppHeader'
import AppContainer from '@ui/AppContainer'

export default function TopOfTheDayModule() {
  const { formatMessage } = useIntl()
  const header = formatMessage({ id: 'page.top.header' })
  const text = formatMessage({ id: 'page.top.dev' })

  return (
    <AppContainer>
      <AppHeader name="energy" mb={4}>
        {header}
      </AppHeader>
      <Box display="flex" alignItems="center" justifyContent="center" flex={1} height="80vh">
        <Typography variant="h5" component="p">
          {text}
        </Typography>
      </Box>
    </AppContainer>
  )
}
