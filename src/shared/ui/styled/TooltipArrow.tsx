import { Tooltip, TooltipProps } from '@mui/material'
import { tooltipClasses } from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'

const TooltipArrow = styled(({ children, className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }}>
    <span>{children}</span>
  </Tooltip>
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.grey[900],
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.grey[900],
  },
}))

export default TooltipArrow
