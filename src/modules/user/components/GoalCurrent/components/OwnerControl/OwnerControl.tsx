import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Box } from '@mui/material'
import { useGoalContext } from '@modules/user/components/GoalCurrent/hooks/useGoalContext'
import BlueButton from '@ui/styled/BlueButton'
import { useMessages } from './hooks/useMessages'

const Button = dynamic(() => import('@mui/material/Button'))
const CompletionModal = dynamic(() => import('@features/confirmation'))
const TasksModal = dynamic(() => import('./components/TasksModal'))

enum ModalType {
  Tasks,
  Completion,
}

function OwnerControl() {
  const { stages, day } = useGoalContext()
  const messages = useMessages()
  const [modal, setModal] = useState<ModalType>()
  const renderCompete = stages.length === day.stage
  const justifyContent = renderCompete ? 'space-between' : 'flex-end'

  const onAddTasks = () => setModal(ModalType.Tasks)

  const onComplete = () => setModal(ModalType.Completion)

  const closeModal = () => setModal(undefined)

  return (
    <>
      <Box display="flex" justifyContent={justifyContent} gap={1}>
        <BlueButton size="small" onClick={onAddTasks}>
          {messages.nextButtonText}
        </BlueButton>
        {renderCompete && (
          <Button size="small" variant="contained" color="warning" onClick={onComplete}>
            {messages.doneButtonText}
          </Button>
        )}
      </Box>
      {modal === ModalType.Tasks && <TasksModal onClose={closeModal} />}
      {modal === ModalType.Completion && <CompletionModal onClose={closeModal} />}
    </>
  )
}

export default OwnerControl
