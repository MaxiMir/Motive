import { EditImageModal } from 'entities/image'
import { useEditCover } from './model'

interface EditCoverModalProps {
  goalId: number
  onClose: () => void
}

function EditCoverModal({ goalId, onClose }: EditCoverModalProps) {
  const { isLoading, mutateAsync } = useEditCover(goalId)

  const onSubmit = (formData: FormData) => {
    mutateAsync(formData).then(onClose)
  }

  return <EditImageModal isLoading={isLoading} onSubmit={onSubmit} onClose={onClose} />
}

export default EditCoverModal
