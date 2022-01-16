import { FC } from 'react'
import dynamic from 'next/dynamic'

const AppTooltip = dynamic(() => import('components/UI/AppTooltip'))

interface AppOptionalTooltipProps {
  title?: string
}

const AppOptionalTooltip: FC<AppOptionalTooltipProps> = ({ title, children }): JSX.Element => {
  return <>{!title ? children : <AppTooltip title={title}>{children}</AppTooltip>}</>
}

export default AppOptionalTooltip
