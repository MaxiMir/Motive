import { Box, CircularProgress } from '@mui/material'
import { useIntl } from 'react-intl'

function Updating() {
  const { formatMessage } = useIntl()
  const message = formatMessage({ id: 'common.updating' })

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <CircularProgress size={14.5} />
      {message}...
    </Box>
  )
}

export default Updating
