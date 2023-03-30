import Alert, { alertClasses } from '@mui/material/Alert'
import { red, teal } from '@mui/material/colors'
import { SnackbarCloseReason } from '@mui/material/Snackbar/Snackbar'
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
        <MuiSnackbar
          open
          autoHideDuration={3000}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          sx={{
            [`& .${alertClasses.root}`]: {
              color: 'common.white',
            },
            [`& .${alertClasses.message}`]: {
              lineHeight: '1.625rem',
            },
            [`& .${alertClasses.standardSuccess}`]: {
              backgroundColor: teal[900],
            },
            [`& .${alertClasses.standardError}`]: {
              backgroundColor: red[900],
            },
            [`& .${alertClasses.action}`]: {
              alignItems: 'center',
            },
            bottom: {
              xs: 80,
              lg: 24,
            },
          }}
          onClose={handleClose}
        >
          <Alert {...alertProps} />
        </MuiSnackbar>
      )}
    </>
  )
}

export default Snackbar
