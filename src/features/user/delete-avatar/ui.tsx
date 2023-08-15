import { Typography } from '@mui/material'
import { useIntl } from 'react-intl'
import CancelButton from 'shared/ui/CancelButton'
import Modal from 'shared/ui/Modal'
import SubmitButton from 'shared/ui/SubmitButton'
import { useDeleteAvatar } from './model'

interface DeleteAvatarModalProps {
  userId: number
  onClose: () => void
}

function DeleteAvatarModal({ userId, onClose }: DeleteAvatarModalProps) {
  const { formatMessage } = useIntl()
  const { isLoading, mutateAsync } = useDeleteAvatar(userId)
  const title = formatMessage({ id: 'common.warning' })
  const description = formatMessage({ id: 'common.delete-warning' })
  const deleteText = formatMessage({ id: 'common.delete' })
  const deletingText = formatMessage({ id: 'common.deleting' })

  const onClick = () => mutateAsync().then(onClose)

  return (
    <Modal
      title={title}
      maxWidth="xs"
      actions={[
        <CancelButton key="cancel" onClick={onClose} />,
        <SubmitButton
          text={deleteText}
          loadingText={deletingText}
          isLoading={isLoading}
          key="submit"
          onClick={onClick}
        />,
      ]}
      onClose={onClose}
    >
      <Typography textAlign="center" fontSize={14}>
        {description}
      </Typography>
    </Modal>
  )
}

export default DeleteAvatarModal
