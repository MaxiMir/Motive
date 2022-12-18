import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Box, Button } from '@mui/material'
import { useGoalContext } from '@modules/user/components/GoalCurrent/hooks'
import AppEmoji from '@ui/AppEmoji'
import { useMessages } from './hooks/useMessages'

const ModalCompletion = dynamic(() => import('@features/confirmation'))
const ModalTasks = dynamic(() => import('./components/ModalTasks'))

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
    <Box display="flex" justifyContent={justifyContent}>
      <Button variant="outlined" startIcon={<AppEmoji name="moon" onlyEmoji />} onClick={onAddTasks}>
        {messages.nextButtonText}
      </Button>
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
