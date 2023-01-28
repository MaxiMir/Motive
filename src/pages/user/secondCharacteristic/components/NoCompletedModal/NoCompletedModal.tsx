import { Box, Stack, Typography } from '@mui/material'
import Modal from 'shared/ui/Modal'
import SpinEmoji from 'shared/ui/SpinEmoji'
import { useMessages } from './hooks/useMessages'

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
          <SpinEmoji name="completed" />
        </Stack>
      </Stack>
    </Modal>
  )
}

export default NoCompletedModal
