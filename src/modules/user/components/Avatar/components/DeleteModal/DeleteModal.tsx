import { Typography } from '@mui/material'
import AppModal from '@ui/AppModal'
import ActionCancel from '@components/Action/ActionCancel'
import ActionSubmit from '@components/Action/ActionSubmit'
import { useMessages } from './hooks/useMessages'
import { useRemovePhoto } from './hooks/useRemovePhoto'

interface DeleteModalProps {
  onClose: () => void
}

function DeleteModal({ onClose }: DeleteModalProps) {
  const messages = useMessages()
  const { isLoading, mutateAsync } = useRemovePhoto()

  const onClick = () => mutateAsync().then(onClose)

  return (
    <AppModal
      title={<Typography sx={{ color: 'error.dark' }}>{messages.title}</Typography>}
      maxWidth="xs"
      actions={[
        <ActionCancel key="cancel" onClick={onClose} />,
        <ActionSubmit
          disabled={isLoading}
          text={messages.deleteText}
          loadingText={messages.deletingText}
          emoji="delete"
          key="submit"
          onClick={onClick}
        />,
      ]}
      onClose={onClose}
    >
      <Typography textAlign="center" sx={{ fontSize: 14 }}>
        {messages.description}
      </Typography>
    </AppModal>
  )
}

export default DeleteModal