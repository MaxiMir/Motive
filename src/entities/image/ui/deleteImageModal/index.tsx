import { Typography } from '@mui/material'
import { useIntl } from 'react-intl'
import CancelButton from 'shared/ui/CancelButton'
import Modal from 'shared/ui/Modal'
import SubmitButton from 'shared/ui/SubmitButton'

interface DeleteImageModalProps {
  isLoading: boolean
  onSubmit: () => void
  onClose: () => void
}

export function DeleteImageModal({ isLoading, onSubmit, onClose }: DeleteImageModalProps) {
  const { formatMessage } = useIntl()
  const title = formatMessage({ id: 'common.warning' })
  const description = formatMessage({ id: 'common.image-delete-warning' })
  const deleteText = formatMessage({ id: 'common.delete' })
  const deletingText = formatMessage({ id: 'common.deleting' })

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
          onClick={onSubmit}
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
