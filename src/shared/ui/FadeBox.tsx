import { Typography } from '@mui/material'
import { styled } from '@mui/system'

const FadeBox = styled(Typography)({
  animation: 'fade 1.4s cubic-bezier(0.550, 0.085, 0.680, 0.530) both',
  '@keyframes fade': {
    from: {
      filter: 'blur(12px)',
      opacity: 0,
    },
    to: {
      filter: 'blur(0px)',
      opacity: 1,
    },
  },
})

export default FadeBox
