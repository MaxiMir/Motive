import { FC } from 'react'
import { Tooltip, TooltipProps } from '@material-ui/core'

export interface AppTooltipProps {
  title: TooltipProps['title']
  className?: string
}

const AppTooltip: FC<AppTooltipProps> = ({ title, className, children }) => (
  <Tooltip title={title}>
    <span className={className}>{children}</span>
  </Tooltip>
)

export default AppTooltip
