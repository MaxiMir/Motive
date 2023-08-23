import { TooltipProps } from '@mui/material'
import { blueGrey } from '@mui/material/colors'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'
import { styled } from '@mui/system'

const TooltipArrow = styled(({ children, className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }}>
    <span>{children}</span>
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
