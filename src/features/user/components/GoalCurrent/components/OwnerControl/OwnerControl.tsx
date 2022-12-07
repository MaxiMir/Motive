import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Box, Button, Tooltip } from '@mui/material'
import { useGoalContext } from '@features/user/components/GoalCurrent/hooks'
import AppEmoji from '@ui/AppEmoji'
import { useMessages } from './hooks/useMessages'

const ModalCompletion = dynamic(() => import('@components/Modal/ModalCompletion'))
const ModalTasks = dynamic(() => import('./components/ModalTasks'))

enum ModalType {
  Tasks,
  Completion,
}

function OwnerControl() {
  const { stages, day } = useGoalContext()
  const feedbackAdded = !!day.feedback
  const messages = useMessages(feedbackAdded)
  const [modal, setModal] = useState<ModalType>()
  const renderCompete = stages.length === day.stage && feedbackAdded
  const justifyContent = renderCompete ? 'space-between' : 'flex-end'

  const onAddTasks = () => setModal(ModalType.Tasks)

  const onComplete = () => setModal(ModalType.Completion)

  const closeModal = () => setModal(undefined)

  return (
    <Box display="flex" justifyContent={justifyContent}>
      <Tooltip title={messages.title} arrow followCursor>
        <span>
          <Button
            variant="outlined"
            disabled={!feedbackAdded}
            startIcon={<AppEmoji name="moon" onlyEmoji />}
            onClick={onAddTasks}
          >
            {messages.nextButtonText}
          </Button>
        </span>
      </Tooltip>
      {renderCompete && (
        <Button variant="outlined" color="warning" startIcon={<AppEmoji name="cup" onlyEmoji />} onClick={onComplete}>
          {messages.doneButtonText}
        </Button>
      )}
      {modal === ModalType.Tasks && <ModalTasks onClose={closeModal} />}
      {modal === ModalType.Completion && <ModalCompletion onClose={closeModal} />}
    </Box>
  )
}

export default OwnerControl
