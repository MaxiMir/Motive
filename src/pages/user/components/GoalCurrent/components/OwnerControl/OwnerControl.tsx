import { Stack } from '@mui/material'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useGoalContext } from '@entities/goal'
import { BlueButton } from '@shared/ui/styled'
import { useMessages } from './hooks/useMessages'

const Button = dynamic(() => import('@mui/material/Button'))
const ConfirmationModal = dynamic(() =>
  import('@entities/confirmation').then((m) => m.ConfirmationModal),
)
const TasksModal = dynamic(() => import('./components/TasksModal'))

const enum ModalType {
  Tasks,
  Completion,
}

function OwnerControl() {
  const { id, stages, day } = useGoalContext()
  const messages = useMessages()
  const [modal, setModal] = useState<ModalType>()
  const renderCompete = stages.length === day.stage
  const justifyContent = renderCompete ? 'space-between' : 'flex-end'

  const onAddTasks = () => setModal(ModalType.Tasks)

  const onComplete = () => setModal(ModalType.Completion)

  const closeModal = () => setModal(undefined)

  return (
    <>
      <Stack direction="row" justifyContent={justifyContent} spacing={1}>
        <BlueButton size="small" onClick={onAddTasks}>
          {messages.nextButtonText}
        </BlueButton>
        {renderCompete && (
          <Button size="small" variant="contained" color="warning" onClick={onComplete}>
            {messages.doneButtonText}
          </Button>
        )}
      </Stack>
      {modal === ModalType.Tasks && <TasksModal onClose={closeModal} />}
      {modal === ModalType.Completion && <ConfirmationModal id={id} onClose={closeModal} />}
    </>
  )
}

export default OwnerControl
