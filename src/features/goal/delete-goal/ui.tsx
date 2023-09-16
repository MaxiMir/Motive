import { Typography } from '@mui/material'
import { useIntl } from 'react-intl'
import CancelButton from 'shared/ui/CancelButton'
import Modal from 'shared/ui/Modal'
import SubmitButton from 'shared/ui/SubmitButton'
import { useDeleteGoal } from './model'

interface DeleteGoalModalProps {
  goalId: number
  onClose: () => void
}

function DeleteGoalModal({ goalId, onClose }: DeleteGoalModalProps) {
  const { formatMessage } = useIntl()
  const { isLoading, mutateAsync } = useDeleteGoal(goalId)
  const title = formatMessage({ id: 'common.warning' })
  const description = formatMessage({ id: 'common.image-goal-warning' })
  const deleteText = formatMessage({ id: 'common.delete' })
  const deletingText = formatMessage({ id: 'common.deleting' })

  const onSubmit = () => mutateAsync().then(onClose)

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

export default DeleteGoalModal
