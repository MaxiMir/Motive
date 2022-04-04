import useLocale from 'hooks/useLocale'
import AppEmoji from 'components/UI/AppEmoji'
import AppGradientButton from 'components/UI/AppGradientButton'
import i18n from './i18n'

export interface ActionCloseProps {
  tmpl: 'close'
  onClick: () => void
}

export default function Index({ onClick }: ActionCloseProps): JSX.Element {
  const { locale } = useLocale()
  const { name } = i18n[locale]

  return (
    <AppGradientButton startIcon={<AppEmoji name="cancel" onlyEmoji />} onClick={onClick}>
      {name}
    </AppGradientButton>
  )
}
