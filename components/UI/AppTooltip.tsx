import { FC } from 'react'
import { Tooltip } from '@material-ui/core/'

interface AppTooltipProps {
  title: string
  className?: string
}

const AppTooltip: FC<AppTooltipProps> = ({ title, children, ...restProps }) => (
  <Tooltip title={title}>
    <span {...restProps}>{children}</span>
  </Tooltip>
)

export default AppTooltip
