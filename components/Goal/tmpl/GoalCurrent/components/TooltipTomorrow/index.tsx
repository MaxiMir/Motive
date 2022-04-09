import { FC } from 'react'
import useLocale from 'hooks/useLocale'
import AppOptionalTooltip from 'components/UI/AppOptionalTooltip'
import i18n from './i18n'

interface TooltipTomorrowProps {
  forTomorrow: boolean
}

const TooltipTomorrow: FC<TooltipTomorrowProps> = ({ forTomorrow, children }) => {
  const { locale } = useLocale()
  const { title } = i18n[locale]

  return <AppOptionalTooltip title={!forTomorrow ? undefined : title}>{children}</AppOptionalTooltip>
}

export default TooltipTomorrow
