import { useIntl } from 'react-intl'
import { EditImageModal } from 'entities/image'
import { useEditAvatar } from './model'

interface EditAvatarModalProps {
  userId: number
  onClose: () => void
}

function EditAvatarModal({ userId, onClose }: EditAvatarModalProps) {
  const { formatMessage } = useIntl()
  const { isLoading, mutateAsync } = useEditAvatar(userId)
  const description = formatMessage({ id: 'common.photo-description' })

  const onSubmit = (formData: FormData) => {
    mutateAsync(formData).then(onClose)
  }

  return (
    <EditImageModal
      description={description}
      isLoading={isLoading}
      onSubmit={onSubmit}
      onClose={onClose}
    />
  )
}

export default EditAvatarModal
