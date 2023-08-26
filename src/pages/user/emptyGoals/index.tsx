import { Stack, Typography } from '@mui/material'
import { useIntl } from 'react-intl'
import FadeBox from 'shared/ui/FadeBox'
import Icon from 'shared/ui/Icon'
import OwnerDescription from './ownerDescription'

interface AddGoalProps {
  viewerPage: boolean
}

function EmptyGoals({ viewerPage }: AddGoalProps) {
  const { formatMessage } = useIntl()
  const title = formatMessage({ id: `page.user.empty-goals.${viewerPage ? 'owner' : 'guest'}` })

  return (
    <Stack justifyContent="center" alignItems="center" gap={1} flex={1}>
      <Typography variant="h6" component="p">
        {title}
      </Typography>
      <FadeBox>
        <Icon name="target" fontSize={60} color="primary.main" />
      </FadeBox>
      {viewerPage && <OwnerDescription />}
    </Stack>
  )
}

export default EmptyGoals
