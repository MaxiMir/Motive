import { styled, tooltipClasses, Tooltip, TooltipProps } from '@mui/material'

const TooltipArrow = styled(({ children, className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }}>
    <span>{children}</span>
  </Tooltip>
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}))

export default TooltipArrow
