import { Locale } from 'hooks/useLocale'
import AppBox from 'components/UI/AppBox'
import AppTypography from 'components/UI/AppTypography'
import i18n from './i18n'

interface EmptyListProps {
  locale: Locale
}

const EmptyList = ({ locale }: EmptyListProps): JSX.Element => {
  const { description, hint } = i18n[locale]

  return (
    <AppBox alignItems="center" justifyContent="center" flex={1}>
      <AppBox flexDirection="column" alignItems="center" width="100%">
        <AppTypography variant="h5" color="primary">
          {description}
        </AppTypography>
        <AppTypography>{hint}</AppTypography>
      </AppBox>
    </AppBox>
  )
}

export default EmptyList
