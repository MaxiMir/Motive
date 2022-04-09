import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Box, Button } from '@mui/material'
import { GoalDto } from 'dto'
import AppEmoji from 'components/UI/AppEmoji'

const Modal = dynamic(() => import('components/Modal'))

interface OwnerWithFeedbackProps {
  goal: GoalDto
}

export default function OwnerWithFeedback({ goal }: OwnerWithFeedbackProps): JSX.Element {
  const { stages, day } = goal
  const [modal, setModal] = useState<'tasks' | 'completion'>()
  const isComplete = stages.length === day.stage

  const onAddTasks = () => setModal('tasks')

  const onComplete = () => setModal('completion')

  const closeModal = () => setModal(undefined)

  return (
    <Box display="flex" justifyContent="space-between">
      <Button variant="outlined" color="error" startIcon={<AppEmoji name="task" onlyEmoji />} onClick={onAddTasks}>
        Add tasks
      </Button>
      {isComplete && (
        <Button variant="outlined" color="warning" startIcon={<AppEmoji name="cup" onlyEmoji />} onClick={onComplete}>
          Done
        </Button>
      )}
      {modal === 'tasks' && <Modal tmpl="tasks" goal={goal} onClose={closeModal} />}
      {modal === 'completion' && <Modal tmpl="completion" goal={goal} onClose={closeModal} />}
    </Box>
  )
}
