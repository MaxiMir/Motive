import useLocale from 'hooks/useLocale'
import AppBox from 'components/UI/AppBox'
import i18n from './i18n'

export default function Level(): JSX.Element {
  const { locale } = useLocale()
  const { lvl } = i18n[locale]

  return (
    <AppBox
      component="sup"
      display={undefined}
      sx={{ marginLeft: '2px', fontSize: '0.625rem', color: 'text.disabled' }}
    >
      {lvl}
    </AppBox>
  )
}
