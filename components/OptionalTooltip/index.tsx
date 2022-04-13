import { FC } from 'react'
import dynamic from 'next/dynamic'
import useLocale from 'hooks/useLocale'
import i18n from './i18n'

const AppTooltip = dynamic(() => import('components/UI/AppTooltip'))

interface AppOptionalTooltipProps {
  tmpl: 'tomorrow' | 'feedback' | 'custom'
  custom?: string | JSX.Element
  wrap: boolean
}

const OptionalTooltip: FC<AppOptionalTooltipProps> = ({ tmpl, custom, wrap, children }): JSX.Element => {
  const { locale } = useLocale()
  const title = tmpl === 'custom' ? custom : i18n[locale][tmpl]

  return <>{!wrap ? children : <AppTooltip title={title || ''}>{children}</AppTooltip>}</>
}

export default OptionalTooltip
