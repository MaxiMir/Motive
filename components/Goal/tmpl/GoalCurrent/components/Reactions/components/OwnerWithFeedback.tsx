import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Button } from '@material-ui/core'
import { GoalDto } from 'dto'
import AppEmoji from 'components/UI/AppEmoji'
import AppBox from 'components/UI/AppBox'

const Modal = dynamic(() => import('components/Modal'))

interface OwnerWithFeedbackProps {
  goal: GoalDto
}

export default function OwnerWithFeedback({ goal }: OwnerWithFeedbackProps): JSX.Element {
  const [openTasks, setOpenTasks] = useState(false)
  const [openComplete, setOpenComplete] = useState(false)

  const toggleTasks = () => setOpenTasks(!openTasks)

  const toggleComplete = () => setOpenComplete(!openComplete)

  return (
    <AppBox justifyContent="space-between">
      <Button variant="outlined" color="primary" startIcon={<AppEmoji name="task" onlyEmoji />} onClick={toggleTasks}>
        Add tasks
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        startIcon={<AppEmoji name="cup" onlyEmoji />}
        onClick={toggleComplete}
      >
        Complete
      </Button>
      {openTasks && <Modal tmpl="tasks" goal={goal} onClose={toggleTasks} />}
      {openComplete && <Modal tmpl="complete" goal={goal} onClose={toggleComplete} />}
    </AppBox>
  )
}
