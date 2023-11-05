import { Typography } from '@mui/material'
import { useIntl } from 'react-intl'
import CancelButton from 'shared/ui/cancel-button'
import Modal from 'shared/ui/modal'
import SubmitButton from 'shared/ui/submit-button'

interface NewVersionModalProps {
  onConfirm: () => void
  onClose: () => void
}

function NewVersionModal({ onConfirm, onClose }: NewVersionModalProps) {
  const { formatMessage } = useIntl()
  const title = formatMessage({ id: 'common-new-version' })
  const description = formatMessage({ id: 'common-new-version-description' })
  const updateText = formatMessage({ id: 'common.update' })

  return (
    <Modal
      title={title}
      actions={[
        <CancelButton key="cancel" onClick={onClose} />,
        <SubmitButton text={updateText} key="submit" onClick={onConfirm} />,
      ]}
      onClose={onClose}
    >
      <Typography>{description}</Typography>
    </Modal>
  )
}

export default NewVersionModal
