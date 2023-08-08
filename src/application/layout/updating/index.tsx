import { Alert, Box, CircularProgress, Snackbar } from '@mui/material'
import { alertClasses } from '@mui/material/Alert'
import { useIntl } from 'react-intl'

function Updating() {
  const { formatMessage } = useIntl()
  const message = formatMessage({ id: 'common.updating' })

  return (
    <Snackbar
      open
      sx={{
        top: '50%',
        left: '50%',
        right: 'initial',
        transform: 'translate(-50%, -50%)',
        [`& .${alertClasses.root}`]: {
          backgroundColor: 'rgba(0, 0, 0, .7)',
        },
      }}
    >
      <Alert variant="standard" icon={false}>
        <Box display="flex" alignItems="center" gap={1} color="zen.silent">
          <CircularProgress size={14.5} color="inherit" />
          {message}...
        </Box>
      </Alert>
    </Snackbar>
  )
}

export default Updating
