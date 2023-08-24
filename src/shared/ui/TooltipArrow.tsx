import { Box, TooltipProps } from '@mui/material'
import { blueGrey } from '@mui/material/colors'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'
import { styled } from '@mui/system'

const TooltipArrow = styled(({ children, className, ...props }: TooltipProps) => (
  <Tooltip arrow disableFocusListener classes={{ popper: className }} {...props}>
    <Box display="inline-flex" alignItems="center">
      {children}
    </Box>
  </Tooltip>
))({
  [`& .${tooltipClasses.arrow}`]: {
    color: blueGrey[900],
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: blueGrey[900],
  },
})

export default TooltipArrow
