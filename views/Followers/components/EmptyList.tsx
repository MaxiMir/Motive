import AppBox from 'components/UI/AppBox'
import AppTypography from 'components/UI/AppTypography'

const EmptyList = (): JSX.Element => (
  <AppBox alignItems="center" justifyContent="center" flex={1}>
    <AppTypography variant="h5" color="primary">
      This list is still empty
    </AppTypography>
  </AppBox>
)

export default EmptyList
