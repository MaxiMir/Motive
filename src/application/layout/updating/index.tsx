import { CircularProgress } from '@mui/material'
import Alert, { alertClasses } from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { styled } from '@mui/system'
import { useIntl } from 'react-intl'

interface UpdatingProps {
  breakpoints?: boolean
}
function Updating({ breakpoints }: UpdatingProps) {
  const { formatMessage } = useIntl()
  const message = formatMessage({ id: 'common.updating' })

  return (
    <Snackbar
      open
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      sx={{
        display: !breakpoints
          ? undefined
          : {
              xs: 'none',
              xl: 'block',
            },
      }}
    >
      <StyledAlert variant="standard" icon={<Icon size={14.5} />}>
        {message}...
      </StyledAlert>
    </Snackbar>
  )
}

const StyledAlert = styled(Alert)({
  [`& .${alertClasses.root}`]: {
    background: 'black',
  },
  [`& .${alertClasses.message}`]: {
    color: 'white',
  },
})

const Icon = styled(CircularProgress)({
  color: 'white',
})

export default Updating
