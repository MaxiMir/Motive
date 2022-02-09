import AppBox from 'components/UI/AppBox'
import AppTypography from 'components/UI/AppTypography'
import AppFadeIcon from 'components/UI/AppFadeIcon'

const EmptyList = (): JSX.Element => (
  <AppBox flexDirection="column" alignItems="center" justifyContent="center" flex={1} spacing={2}>
    <AppTypography color="primary" variant="h6">
      The list is still empty
    </AppTypography>
    <AppFadeIcon name="followers" />
  </AppBox>
)

export default EmptyList
