import { styled } from '@mui/system'
import { Button } from '@mui/material'
import { grey } from '@mui/material/colors'

const GreyButton = styled(Button)({
  color: '#fff',
  borderColor: grey[800],
  backgroundColor: grey[800],
  '&:hover': {
    backgroundColor: grey[900],
  },
})

export default GreyButton
