import { Locale } from 'hooks/useLocale'
import AppBox from 'components/UI/AppBox'
import AppTypography from 'components/UI/AppTypography'
import AppFadeIcon from 'components/UI/AppFadeIcon'
import OwnerDescription from './components/OwnerDescription'
import i18n from './i18n'

interface AddGoalProps {
  clientPage: boolean
  locale: Locale
}

export default function EmptyGoals({ clientPage, locale }: AddGoalProps): JSX.Element {
  const { guest, owner } = i18n[locale]

  return (
    <>
      <AppBox flexDirection="column" justifyContent="center" alignItems="center" spacing={1} flex={1}>
        <AppTypography variant="h6" component="p" color="primary">
          {clientPage ? owner : guest}
        </AppTypography>
        <AppFadeIcon name="goal" />
        {clientPage && <OwnerDescription locale={locale} />}
      </AppBox>
    </>
  )
}
