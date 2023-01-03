import { styled } from '@mui/system'
import { Button } from '@mui/material'
import { blue } from '@mui/material/colors'

const BlueButton = styled(Button)({
  color: '#fff',
  borderColor: blue[800],
  backgroundColor: blue[800],
  '&:hover': {
    backgroundColor: blue[400],
  },
})

export default BlueButton
