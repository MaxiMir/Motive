import useLocale from 'hooks/useLocale'
import AppEmoji from 'components/ui/AppEmoji'
import AppGradientButton from 'components/ui/AppGradientButton'
import i18n from './i18n'

export interface ActionCloseProps {
  onClick: () => void
}

export default function ActionClose({ onClick }: ActionCloseProps) {
  const { locale } = useLocale()
  const { name } = i18n[locale]

  return (
    <AppGradientButton startIcon={<AppEmoji name="cancel" onlyEmoji />} onClick={onClick}>
      {name}
    </AppGradientButton>
  )
}
