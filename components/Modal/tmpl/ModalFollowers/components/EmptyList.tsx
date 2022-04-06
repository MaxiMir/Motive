import { Typography } from '@mui/material'
import AppBox from 'components/UI/AppBox'
import AppFadeIcon from 'components/UI/AppFadeIcon'

const EmptyList = (): JSX.Element => (
  <AppBox flexDirection="column" alignItems="center" justifyContent="center" flex={1} gap={2}>
    <Typography color="primary" variant="h6">
      The list is still empty
    </Typography>
    <AppFadeIcon name="followers" />
  </AppBox>
)

export default EmptyList
