import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Button } from '@material-ui/core'
import { GoalDto } from 'dto'
import AppEmoji from 'components/UI/AppEmoji'
import AppBox from 'components/UI/AppBox'

const Modal = dynamic(() => import('components/Modal'))

type ModalTmpl = 'tasks' | 'complete'

interface OwnerWithFeedbackProps {
  goal: GoalDto
}

export default function OwnerWithFeedback({ goal }: OwnerWithFeedbackProps): JSX.Element {
  const { stages, day } = goal
  const [modal, setModal] = useState<ModalTmpl>()

  const openModal = (tmpl: ModalTmpl) => setModal(tmpl)

  const closeModal = () => setModal(undefined)

  return (
    <AppBox justifyContent="space-between">
      <Button
        variant="outlined"
        color="primary"
        startIcon={<AppEmoji name="task" onlyEmoji />}
        onClick={() => openModal('tasks')}
      >
        Add tasks
      </Button>
      {stages.length === day.stage && (
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<AppEmoji name="cup" onlyEmoji />}
          onClick={() => openModal('complete')}
        >
          Complete
        </Button>
      )}
      {modal === 'tasks' && <Modal tmpl="tasks" goal={goal} onClose={closeModal} />}
      {modal === 'complete' && <Modal tmpl="complete" goal={goal} onClose={closeModal} />}
    </AppBox>
  )
}
