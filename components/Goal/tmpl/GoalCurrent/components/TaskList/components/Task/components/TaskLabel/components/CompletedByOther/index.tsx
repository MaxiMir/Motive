import useLocale from 'hooks/useLocale'
import AppTooltip from 'components/UI/AppTooltip'
import AppEmoji from 'components/UI/AppEmoji'
import i18n from './i18n'

export default function CompletedByOther(): JSX.Element {
  const { locale } = useLocale()
  const { title } = i18n[locale]

  return (
    <AppTooltip title={title}>
      <AppEmoji name="fire" onlyEmoji />
    </AppTooltip>
  )
}
