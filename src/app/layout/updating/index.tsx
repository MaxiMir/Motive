import { Alert, CircularProgress, Snackbar } from '@mui/material'
import { alertClasses } from '@mui/material/Alert'

function Updating() {
  return (
    <Snackbar
      open
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      sx={{
        [`& .${alertClasses.root}`]: {
          aspectRatio: '1 / 1',
          backgroundColor: 'rgba(0, 0, 0, .8)',
        },
        top: {
          xs: 80,
          lg: 24,
        },
      }}
    >
      <Alert variant="standard" icon={false}>
        <CircularProgress size={14.5} color="inherit" />
      </Alert>
    </Snackbar>
  )
}

export default Updating