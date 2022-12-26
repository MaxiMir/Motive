import { styled } from '@mui/system'
import { Button } from '@mui/material'
import { grey } from '@mui/material/colors'

const GreyButton = styled(Button)({
  minWidth: 'initial',
  color: grey[200],
  backgroundColor: grey[800],
  '&:hover': {
    backgroundColor: grey[500],
  },
})

export default GreyButton
