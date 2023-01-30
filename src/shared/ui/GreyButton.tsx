import { Button } from '@mui/material'
import { styled } from '@mui/system'

export const GreyButton = styled(Button)(({ theme }) => ({
  color: theme.palette.common.white,
  borderColor: theme.palette.grey[800],
  backgroundColor: theme.palette.grey[800],
  ':hover': {
    backgroundColor: '#1a1a1a',
  },
}))

export default GreyButton
