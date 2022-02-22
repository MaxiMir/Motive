import AppBox from 'components/UI/AppBox'
import AppTypography from 'components/UI/AppTypography'
import AppSpinIcon from 'components/UI/AppSpinIcon'

const EmptyList = (): JSX.Element => (
  <AppBox flexDirection="column" alignItems="center" justifyContent="center" flex={1} spacing={2}>
    <AppTypography color="primary" variant="h6">
      The list is still empty
    </AppTypography>
    <AppSpinIcon name="completed" />
  </AppBox>
)

export default EmptyList
