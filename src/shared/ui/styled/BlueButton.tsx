import { Button } from '@mui/material'
import { blue } from '@mui/material/colors'
import { styled } from '@mui/system'

const BlueButton = styled(Button)(({ theme }) => ({
  color: theme.palette.common.white,
  borderColor: blue[800],
  backgroundColor: blue[800],
  ':hover': {
    backgroundColor: blue[400],
  },
}))

export default BlueButton
