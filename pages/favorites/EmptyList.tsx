import { Typography } from '@material-ui/core/'
import AppBox from 'components/UI/AppBox'

const EmptyList = (): JSX.Element => (
  <AppBox alignItems="center" justifyContent="center" flex={1}>
    <AppBox flexDirection="column" alignItems="center" width="100%">
      <Typography variant="h5" style={{ color: '#C8B1BB' }}>
        The list is empty.
      </Typography>
      <Typography>Add people you are interested in</Typography>
    </AppBox>
  </AppBox>
)

export default EmptyList
