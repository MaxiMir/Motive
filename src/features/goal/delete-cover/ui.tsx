import { DeleteImageModal } from 'entities/image'
import { useDeleteCover } from './model'

interface DeleteCoverModalProps {
  goalId: number
  onClose: () => void
}

function DeleteCoverModal({ goalId, onClose }: DeleteCoverModalProps) {
  const { isLoading, mutateAsync } = useDeleteCover(goalId)

  const onSubmit = () => mutateAsync().then(onClose)

  return <DeleteImageModal isLoading={isLoading} onSubmit={onSubmit} onClose={onClose} />
}

export default DeleteCoverModal
