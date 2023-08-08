import Alert from '@mui/material/Alert'
import { red, teal } from '@mui/material/colors'
import { SnackbarCloseReason } from '@mui/material/Snackbar/Snackbar'
import { withStyles } from '@mui/styles'
import { SyntheticEvent } from 'react'
import dynamic from 'next/dynamic'
import { useSnackbarStore } from './model'

const MuiSnackbar = dynamic(() => import('@mui/material/Snackbar'))

function Snackbar() {
  const { open, alertProps, closeSnackbar } = useSnackbarStore()

  const handleClose = (_event: SyntheticEvent | Event, reason: SnackbarCloseReason) => {
    if (reason === 'clickaway') return

    closeSnackbar()
  }

  return (
    <>
      {open && (
        <StyledSnackbar
          open
          autoHideDuration={3000}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          onClose={handleClose}
          sx={{
            bottom: {
              xs: 80,
              lg: 24,
            },
          }}
        >
          <Alert {...alertProps} />
        </StyledSnackbar>
      )}
    </>
  )
}

const StyledSnackbar = withStyles({
  root: {
    color: 'common.white',
  },
  message: {
    lineHeight: '1.625rem',
  },
  standardSuccess: {
    backgroundColor: teal[900],
  },
  standardError: {
    backgroundColor: red[900],
  },
  action: {
    alignItems: 'center',
  },
})(MuiSnackbar)

export default Snackbar
