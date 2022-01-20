import { FC } from 'react'
import dynamic from 'next/dynamic'
import { AppTooltipProps } from 'components/UI/AppTooltip'

const AppTooltip = dynamic(() => import('components/UI/AppTooltip'))

interface AppOptionalTooltipProps {
  title?: AppTooltipProps['title']
}

const AppOptionalTooltip: FC<AppOptionalTooltipProps> = ({ title, children }): JSX.Element => {
  return <>{!title ? children : <AppTooltip title={title}>{children}</AppTooltip>}</>
}

export default AppOptionalTooltip
