import { Box, Stack } from '@mui/material'
import AppModal from '@ui/AppModal'
import { useMessages } from './hooks/useMessages'
import EmptyList from './components/EmptyList/EmptyList'

interface NoCompletedModalProps {
  onClose: () => void
}

function NoCompletedModal({ onClose }: NoCompletedModalProps) {
  const messages = useMessages()

  return (
    <AppModal
      title={
        <>
          <Box component="span" sx={{ color: 'zen.sand' }}>
            {messages.title}
          </Box>{' '}
          {messages.subtitle}
        </>
      }
      maxWidth="xs"
      onClose={onClose}
    >
      <Stack spacing={2} minHeight={400} overflow="scroll">
        <EmptyList />
      </Stack>
    </AppModal>
  )
}

export default NoCompletedModal
