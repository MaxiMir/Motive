import { Box, Alert, CircularProgress, Snackbar } from '@mui/material'
import { styled } from '@mui/system'
import { useIntl } from 'react-intl'

function Updating() {
  const { formatMessage } = useIntl()
  const message = formatMessage({ id: 'common.updating' })

  return (
    <StyledSnackbar open>
      <StyledAlert variant="standard" icon={false}>
        <Box display="flex" alignItems="center" gap={1} color="zen.silent">
          <CircularProgress size={14.5} color="inherit" />
          {message}...
        </Box>
      </StyledAlert>
    </StyledSnackbar>
  )
}

const StyledSnackbar = styled(Snackbar)({
  top: '50%',
  left: '50%',
  right: 'initial',
  transform: 'translate(-50%, -50%)',
})

const StyledAlert = styled(Alert)({
  backgroundColor: 'rgba(0, 0, 0, .7)',
})

export default Updating
