import { styled } from '@mui/system'
import { Button } from '@mui/material'

const GreyButton = styled(Button)(({ theme }) => ({
  color: '#fff',
  borderColor: theme.palette.grey[800],
  backgroundColor: theme.palette.grey[800],
  ':hover': {
    backgroundColor: '#1a1a1a',
  },
}))

export default GreyButton
