import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useIntl } from 'react-intl'
import { Box, Button, Tooltip } from '@mui/material'
import { GoalDto } from '@dto'
import AppEmoji from '@ui/AppEmoji'

const ModalTasks = dynamic(() => import('./components/ModalTasks'))
const ModalCompletion = dynamic(() => import('@components/Modal/ModalCompletion'))

export interface OwnerControlProps {
  goal: GoalDto
}

export default function OwnerControl({ goal }: OwnerControlProps) {
  const { stages, day } = goal
  const { formatMessage } = useIntl()
  const [modal, setModal] = useState<'tasks' | 'completion'>()
  const feedbackAdded = !!goal.day.feedback
  const renderCompete = stages.length === day.stage && feedbackAdded
  const justifyContent = renderCompete ? 'space-between' : 'flex-end'
  const title = !feedbackAdded && formatMessage({ id: 'component.tooltip.feedback' })
  const doneButtonText = formatMessage({ id: 'common.done' })
  const nextButtonText = formatMessage({ id: 'common.next' })

  const onAddTasks = () => setModal('tasks')

  const onComplete = () => setModal('completion')

  const closeModal = () => setModal(undefined)

  return (
    <Box display="flex" justifyContent={justifyContent}>
      <Tooltip title={title} arrow followCursor>
        <span>
          <Button
            variant="outlined"
            disabled={!feedbackAdded}
            startIcon={<AppEmoji name="moon" onlyEmoji />}
            onClick={onAddTasks}
          >
            {nextButtonText}
          </Button>
        </span>
      </Tooltip>
      {renderCompete && (
        <Button variant="outlined" color="warning" startIcon={<AppEmoji name="cup" onlyEmoji />} onClick={onComplete}>
          {doneButtonText}
        </Button>
      )}
      {modal === 'tasks' && <ModalTasks goal={goal} onClose={closeModal} />}
      {modal === 'completion' && <ModalCompletion goal={goal} onClose={closeModal} />}
    </Box>
  )
}
