import { Typography } from '@mui/material'
import CancelButton from '@shared/ui/CancelButton'
import Modal from '@shared/ui/Modal'
import SubmitButton from '@shared/ui/SubmitButton'
import { useMessages, useDeleteAvatar } from './lib'

interface DeletingAvatarModalProps {
  userId: number
  onClose: () => void
}

function DeletingAvatarModal({ userId, onClose }: DeletingAvatarModalProps) {
  const messages = useMessages()
  const { isLoading, mutateAsync } = useDeleteAvatar(userId)

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

export default DeletingAvatarModal
