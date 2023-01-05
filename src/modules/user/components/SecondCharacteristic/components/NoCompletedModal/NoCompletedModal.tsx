import { Box } from '@mui/material'
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
      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        sx={{
          minHeight: 400,
          overflow: 'scroll',
        }}
      >
        <EmptyList />
      </Box>
    </AppModal>
  )
}

export default NoCompletedModal
