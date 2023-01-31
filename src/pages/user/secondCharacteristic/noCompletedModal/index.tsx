import { Box, Stack, Typography } from '@mui/material'
import Modal from 'shared/ui/Modal'
import SpinTypography from 'shared/ui/SpinTypography'
import { useMessages } from './lib'

interface NoCompletedModalProps {
  onClose: () => void
}

function NoCompletedModal({ onClose }: NoCompletedModalProps) {
  const messages = useMessages()

  return (
    <Modal
      title={
        <>
          <Box component="span" color="zen.sand">
            {messages.title}
          </Box>{' '}
          {messages.subtitle}
        </>
      }
      maxWidth="xs"
      onClose={onClose}
    >
      <Stack spacing={2} minHeight={400}>
        <Stack alignItems="center" justifyContent="center" flex={1} spacing={2}>
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
