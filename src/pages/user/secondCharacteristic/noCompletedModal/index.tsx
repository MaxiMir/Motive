import { Stack, Typography } from '@mui/material'
import Modal from 'shared/ui/Modal'
import SpinTypography from 'shared/ui/SpinTypography'
import { useMessages } from './lib'

interface NoCompletedModalProps {
  onClose: () => void
}

function NoCompletedModal({ onClose }: NoCompletedModalProps) {
  const messages = useMessages()
  const title = `${messages.title} ${messages.subtitle}`

  return (
    <Modal title={title} maxWidth="xs" onClose={onClose}>
      <Stack gap={2} minHeight={400}>
        <Stack alignItems="center" justifyContent="center" flex={1} gap={2}>
          <Typography variant="h6" component="p">
            {messages.header}
          </Typography>
          <SpinTypography>🏆</SpinTypography>
        </Stack>
      </Stack>
    </Modal>
  )
}

export default NoCompletedModal
