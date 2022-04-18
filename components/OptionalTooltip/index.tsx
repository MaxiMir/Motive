import { FC } from 'react'
import dynamic from 'next/dynamic'
import useLocale from 'hooks/useLocale'
import i18n from './i18n'

const Tooltip = dynamic(() => import('@mui/material/Tooltip'))

interface AppOptionalTooltipProps {
  tmpl: 'tomorrow' | 'feedback' | 'custom'
  custom?: string | JSX.Element
  followCursor?: boolean
  wrap: boolean
}

const OptionalTooltip: FC<AppOptionalTooltipProps> = ({ tmpl, custom, wrap, followCursor, children }): JSX.Element => {
  const { locale } = useLocale()
  const title = tmpl === 'custom' ? custom : i18n[locale][tmpl]

  return (
    <>
      {!wrap ? (
        children
      ) : (
        <Tooltip title={title || ''} arrow followCursor={followCursor}>
          <span>{children}</span>
        </Tooltip>
      )}
    </>
  )
}

export default OptionalTooltip
