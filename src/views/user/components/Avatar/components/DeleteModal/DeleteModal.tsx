import { Typography } from '@mui/material'
import Modal from '@ui/Modal'
import SubmitButton from '@ui/SubmitButton'
import CancelButton from '@ui/CancelButton'
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
    <Modal
      title={<Typography sx={{ color: 'error.dark' }}>{messages.title}</Typography>}
      maxWidth="xs"
      actions={[
        <CancelButton key="cancel" onClick={onClose} />,
        <SubmitButton
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
    </Modal>
  )
}

export default DeleteModal
