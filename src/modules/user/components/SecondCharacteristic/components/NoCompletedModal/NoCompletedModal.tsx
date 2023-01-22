import { Box, Stack, Typography } from '@mui/material'
import AppModal from '@ui/AppModal'
import AppSpinIcon from '@ui/AppSpinIcon'
import { useMessages } from './hooks/useMessages'

interface NoCompletedModalProps {
  onClose: () => void
}

function NoCompletedModal({ onClose }: NoCompletedModalProps) {
  const messages = useMessages()

  return (
    <AppModal
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
          <AppSpinIcon name="completed" />
        </Stack>
      </Stack>
    </AppModal>
  )
}

export default NoCompletedModal
