import { useIntl } from 'react-intl'
import { Box, Typography } from '@mui/material'
import AppFadeIcon from '@ui/AppFadeIcon'
import OwnerDescription from './components/OwnerDescription'

interface AddGoalProps {
  clientPage: boolean
}

function EmptyGoals({ clientPage }: AddGoalProps) {
  const { formatMessage } = useIntl()
  const type = clientPage ? 'owner' : 'guest'
  const title = formatMessage({ id: `page.user.empty-goals.${type}` })

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap={1} mt={3} flex={1}>
      <Typography variant="h6" component="p" color="primary">
        {title}
      </Typography>
      <AppFadeIcon name="goal" />
      {clientPage && <OwnerDescription />}
    </Box>
  )
}

export default EmptyGoals
