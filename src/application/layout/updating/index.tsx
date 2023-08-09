import { Alert, CircularProgress, Snackbar } from '@mui/material'
import { withStyles } from '@mui/styles'
import { styled } from '@mui/system'
import { useIntl } from 'react-intl'

function Updating() {
  const { formatMessage } = useIntl()
  const message = formatMessage({ id: 'common.updating' })

  return (
    <StyledSnackbar open>
      <StyledAlert variant="standard" icon={<Icon size={14.5} />}>
        {message}...
      </StyledAlert>
    </StyledSnackbar>
  )
}

const StyledSnackbar = withStyles({
  root: {
    top: '50%',
    left: '50%',
    right: 'initial',
    transform: 'translate(-50%, -50%)',
  },
})(Snackbar)

const Icon = styled(CircularProgress)({
  color: 'white',
})

const StyledAlert = withStyles({
  root: {
    background: 'black',
  },
  message: {
    color: 'white',
  },
})(Alert)

export default Updating
