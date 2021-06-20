import { FC } from 'react'
import { Tooltip } from '@material-ui/core/'

interface AppTooltipProps {
  title: string
}

const AppTooltip: FC<AppTooltipProps> = ({ title, children }) => (
  <Tooltip title={title}>
    <span>{children}</span>
  </Tooltip>
)

export default AppTooltip
