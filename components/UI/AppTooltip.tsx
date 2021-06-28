import { FC } from 'react'
import { Tooltip } from '@material-ui/core/'

interface AppTooltipProps {
  title: string
  className?: string
}

const AppTooltip: FC<AppTooltipProps> = ({ title, className, children }) => (
  <Tooltip title={title}>
    <span className={className}>{children}</span>
  </Tooltip>
)

export default AppTooltip
