import { GoalDto } from 'dto'
import ModalAction from 'components/ModalAction'
import AppModal from 'components/UI/AppModal'

export interface ModalUnsubscribeProps {
  tmpl: 'unsubscribe'
  goal: GoalDto
  onClose: () => void
}

export default function ModalUnsubscribe({ goal, onClose }: ModalUnsubscribeProps): JSX.Element {
  const isLoading = false
  const handleSubmit = () => false
  console.log(goal)
  return (
    <AppModal
      title="Start from this day or start from the beginning?"
      maxWidth="xs"
      actions={[
        <ModalAction tmpl="close" onClick={onClose} />,
        <ModalAction
          tmpl="submit"
          isLoading={isLoading}
          name="Add"
          nameLoading="Adding"
          emoji="feedback"
          onClick={handleSubmit}
        />,
      ]}
      onClose={onClose}
    >
      11111
    </AppModal>
  )
}
