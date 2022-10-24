import { useIntl } from 'react-intl'
import { Tooltip } from '@mui/material'
import AppEmoji from 'components/ui/AppEmoji'
import i18n from './i18n'

export default function CompletedByOther() {
  const { locale } = useIntl()
  const { title } = i18n[locale]

  return (
    <Tooltip arrow title={title}>
      <span>
        <AppEmoji name="fire" onlyEmoji />
      </span>
    </Tooltip>
  )
}
