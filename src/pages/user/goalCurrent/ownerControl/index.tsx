import { Stack } from '@mui/material'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import BlueButton from 'shared/ui/BlueButton'
import { useMessages } from './lib'
import { ModalType } from './types'

const Button = dynamic(() => import('@mui/material/Button'))
const CreateConfirmationModal = dynamic(() => import('features/confirmation/create-confirmation'))
const CreateDayModal = dynamic(() => import('features/day/create-day'))

interface OwnerControlProps {
  goalId: number
  stages: string[]
  dayStage: number
  dayDate: string
}

function OwnerControl({ goalId, stages, dayStage, dayDate }: OwnerControlProps) {
  const messages = useMessages()
  const [modal, setModal] = useState<ModalType>()
  const renderCompete = stages.length === dayStage
  const justifyContent = renderCompete ? 'space-between' : 'flex-end'

  const onAddTasks = () => setModal(ModalType.Tasks)

  const onComplete = () => setModal(ModalType.Completion)

  const closeModal = () => setModal(undefined)

  return (
    <>
      <Stack direction="row" justifyContent={justifyContent} gap={1}>
        <BlueButton size="small" onClick={onAddTasks}>
          {messages.nextButtonText}
        </BlueButton>
        {renderCompete && (
          <Button size="small" variant="contained" color="warning" onClick={onComplete}>
            {messages.doneButtonText}
          </Button>
        )}
      </Stack>
      {modal === ModalType.Tasks && (
        <CreateDayModal goalId={goalId} dayDate={dayDate} onClose={closeModal} />
      )}
      {modal === ModalType.Completion && (
        <CreateConfirmationModal goalId={goalId} onClose={closeModal} />
      )}
    </>
  )
}

export default OwnerControl
