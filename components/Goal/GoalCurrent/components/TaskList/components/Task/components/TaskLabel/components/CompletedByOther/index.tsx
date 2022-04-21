import { Tooltip } from '@mui/material'
import useLocale from 'hooks/useLocale'
import AppEmoji from 'components/UI/AppEmoji'
import i18n from './i18n'

export default function CompletedByOther(): JSX.Element {
  const { locale } = useLocale()
  const { title } = i18n[locale]

  return (
    <Tooltip arrow title={title}>
      <span>
        <AppEmoji name="fire" onlyEmoji />
      </span>
    </Tooltip>
  )
}
