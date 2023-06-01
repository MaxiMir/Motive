import { Stack, Typography } from '@mui/material'
import { useIntl } from 'react-intl'
import Modal from 'shared/ui/Modal'
import SpinTypography from 'shared/ui/SpinTypography'

interface NoCompletedModalProps {
  onClose: () => void
}

function NoCompletedModal({ onClose }: NoCompletedModalProps) {
  const { formatMessage } = useIntl()
  const completed = formatMessage({ id: 'common.completed' })
  const goals = formatMessage({ id: 'common.goals' })
  const header = formatMessage({ id: 'common.empty' })
  const title = `${completed} ${goals}`

  return (
    <Modal title={title} maxWidth="xs" onClose={onClose}>
      <Stack gap={2} minHeight={400}>
        <Stack alignItems="center" justifyContent="center" flex={1} gap={2}>
          <Typography variant="h6" component="p">
            {header}
          </Typography>
          <SpinTypography>🏆</SpinTypography>
        </Stack>
      </Stack>
    </Modal>
  )
}

export default NoCompletedModal
