import { FC } from 'react'
import AppOptionalTooltip from 'components/UI/AppOptionalTooltip'

interface TooltipTomorrowProps {
  forTomorrow: boolean
}

const TooltipTomorrow: FC<TooltipTomorrowProps> = ({ forTomorrow, children }) => {
  return (
    <AppOptionalTooltip title={!forTomorrow ? undefined : 'Will be available tomorrow'}>{children}</AppOptionalTooltip>
  )
}

export default TooltipTomorrow
