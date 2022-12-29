import { styled } from '@mui/system'
import { Button } from '@mui/material'
import { blue, grey } from '@mui/material/colors'

const BlueButton = styled(Button)({
  minWidth: 'initial',
  color: grey[200],
  borderColor: blue[800],
  backgroundColor: blue[800],
  '&:hover': {
    backgroundColor: blue[600],
  },
})

export default BlueButton
