import AppBox from 'components/UI/AppBox'
import AppTypography from 'components/UI/AppTypography'

const EmptyList = (): JSX.Element => (
  <AppBox alignItems="center" justifyContent="center" flex={1}>
    <AppBox flexDirection="column" alignItems="center" width="100%">
      <AppTypography variant="h5" color="primary">
        The list is empty
      </AppTypography>
      <AppTypography>Add people you are interested in</AppTypography>
    </AppBox>
  </AppBox>
)

export default EmptyList
