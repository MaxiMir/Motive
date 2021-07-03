import { FC } from 'react'
import { Tooltip } from '@material-ui/core/'

interface AppTooltipProps {
  title: string
  className?: string
}

const AppTooltip: FC<AppTooltipProps> = ({ title, ...restProps }) => (
  <Tooltip title={title}>
    <span {...restProps} />
  </Tooltip>
)

export default AppTooltip
