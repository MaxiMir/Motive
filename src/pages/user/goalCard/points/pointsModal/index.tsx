import { Stack, Typography, Alert } from '@mui/material'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { useDeviceContext } from 'entities/device'
import Icon from 'shared/ui/Icon'
import { Row } from './row'

const Modal = dynamic(() => import('shared/ui/Modal'))
const Drawer = dynamic(() => import('shared/ui/Drawer'))

interface PointsModalProps {
  title: string
  points: number
  pointsTasks: number
  onClose: () => void
}

function PointsModal({ title, points, pointsTasks, onClose }: PointsModalProps) {
  const { formatMessage } = useIntl()
  const { isMobile } = useDeviceContext()
  const ratedByUsers = points - pointsTasks
  const tasksName = formatMessage({ id: 'common.completed-tasks' })
  const likesName = formatMessage({ id: 'common.likes' })
  const summeryText = formatMessage({ id: 'common.points-summery' })
  const ModalComponent = isMobile ? Drawer : Modal

  return (
    <ModalComponent title={title} onClose={onClose}>
      <Stack gap={2}>
        <Row icon="assignment" name={tasksName} value={pointsTasks} />
        <Row icon="favorite" name={likesName} value={ratedByUsers} />
        <Alert severity="info" icon={<Icon name="upgrade" color="#c39738" />}>
          <Typography variant="caption">{summeryText}</Typography>
        </Alert>
      </Stack>
    </ModalComponent>
  )
}

export default PointsModal
