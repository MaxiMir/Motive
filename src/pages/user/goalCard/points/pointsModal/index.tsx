import { Stack, Typography, Alert } from '@mui/material'
import { useIntl } from 'react-intl'
import Icon from 'shared/ui/Icon'
import Popup from 'shared/ui/Popup'
import { Row } from './row'

interface PointsModalProps {
  title: string
  points: number
  pointsTasks: number
  onClose: () => void
}

function PointsModal({ title, points, pointsTasks, onClose }: PointsModalProps) {
  const { formatMessage } = useIntl()
  const ratedByUsers = points - pointsTasks
  const tasksName = formatMessage({ id: 'common.completed-tasks' })
  const likesName = formatMessage({ id: 'common.likes' })
  const summeryText = formatMessage({ id: 'common.points-summery' })

  return (
    <Popup title={title} onClose={onClose}>
      <Stack gap={2} py={3} px={2}>
        <Row icon="assignment" name={tasksName} value={pointsTasks} />
        <Row icon="favorite" name={likesName} value={ratedByUsers} />
        <Alert severity="info" icon={<Icon name="upgrade" color="#c39738" />}>
          <Typography variant="caption">{summeryText}</Typography>
        </Alert>
      </Stack>
    </Popup>
  )
}

export default PointsModal
