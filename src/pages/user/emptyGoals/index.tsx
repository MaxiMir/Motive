import { Stack, Typography } from '@mui/material'
import { useIntl } from 'react-intl'
import FadeEmoji from 'shared/ui/FadeEmoji'
import OwnerDescription from './ownerDescription'

interface AddGoalProps {
  clientPage: boolean
}

function EmptyGoals({ clientPage }: AddGoalProps) {
  const { formatMessage } = useIntl()
  const title = formatMessage({ id: `page.user.empty-goals.${clientPage ? 'owner' : 'guest'}` })

  return (
    <Stack justifyContent="center" alignItems="center" spacing={1} flex={1}>
      <Typography variant="h6" component="p" color="primary" mb={2}>
        {title}
      </Typography>
      <FadeEmoji name="goal" />
      {clientPage && <OwnerDescription />}
    </Stack>
  )
}

export default EmptyGoals
