import { Typography } from '@mui/material'
import { useIntl } from 'react-intl'
import CancelButton from 'shared/ui/cancel-button'
import Modal from 'shared/ui/modal'
import SubmitButton from 'shared/ui/submit-button'

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
