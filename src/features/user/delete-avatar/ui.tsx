import { DeleteImageModal } from 'entities/image'
import { useDeleteAvatar } from './model'

interface DeleteAvatarModalProps {
  userId: number
  onClose: () => void
}

function DeleteAvatarModal({ userId, onClose }: DeleteAvatarModalProps) {
  const { isLoading, mutateAsync } = useDeleteAvatar(userId)

  const onSubmit = () => mutateAsync().then(onClose)

  return <DeleteImageModal isLoading={isLoading} onSubmit={onSubmit} onClose={onClose} />
}

export default DeleteAvatarModal
