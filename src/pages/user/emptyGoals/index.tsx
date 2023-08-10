import { Stack, Typography } from '@mui/material'
import { useIntl } from 'react-intl'
import FadeTypography from 'shared/ui/FadeTypography'
import OwnerDescription from './ownerDescription'

interface AddGoalProps {
  viewerPage: boolean
}

function EmptyGoals({ viewerPage }: AddGoalProps) {
  const { formatMessage } = useIntl()
  const title = formatMessage({ id: `page.user.empty-goals.${viewerPage ? 'owner' : 'guest'}` })

  return (
    <Stack justifyContent="center" alignItems="center" gap={1} flex={1}>
      <Typography variant="h6" component="p" color="primary" mb={2}>
        {title}
      </Typography>
      <FadeTypography>💎</FadeTypography>
      {viewerPage && <OwnerDescription />}
    </Stack>
  )
}

export default EmptyGoals
