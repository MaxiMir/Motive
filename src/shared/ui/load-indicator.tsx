import { Box, CircularProgress } from '@mui/material'
import { styled } from '@mui/system'

function LoadIndicator() {
  return (
    <Box height={24} marginX="auto">
      <StyledCircularProgress size={14.5} color="inherit" />
    </Box>
  )
}

const StyledCircularProgress = styled(CircularProgress)(({ theme }) => ({
  color: theme.palette.grey[600],
}))

export default LoadIndicator
