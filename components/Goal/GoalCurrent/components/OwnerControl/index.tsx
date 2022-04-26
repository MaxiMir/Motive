import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Box, Button } from '@mui/material'
import { GoalDto } from 'dto'
import useLocale from 'hooks/useLocale'
import OptionalTooltip from 'components/OptionalTooltip'
import AppEmoji from 'components/UI/AppEmoji'
import i18n from './i18n'

const ModalTasks = dynamic(() => import('components/Modal/ModalTasks'))
const ModalCompletion = dynamic(() => import('components/Modal/ModalCompletion'))

export interface OwnerControlProps {
  goal: GoalDto
}

export default function OwnerControl({ goal }: OwnerControlProps) {
  const { stages, day } = goal
  const { locale } = useLocale()
  const [modal, setModal] = useState<'tasks' | 'completion'>()
  const { nextButton, doneButton } = i18n[locale]
  const feedbackAdded = !!goal.day.feedback
  const renderCompete = stages.length === day.stage && feedbackAdded
  const justifyContent = renderCompete ? 'space-between' : 'flex-end'

  const onAddTasks = () => setModal('tasks')

  const onComplete = () => setModal('completion')

  const closeModal = () => setModal(undefined)

  return (
    <Box display="flex" justifyContent={justifyContent}>
      <OptionalTooltip tmpl="feedback" wrap={!feedbackAdded} followCursor>
        <Button
          variant="outlined"
          disabled={!feedbackAdded}
          startIcon={<AppEmoji name="moon" onlyEmoji />}
          onClick={onAddTasks}
        >
          {nextButton}
        </Button>
      </OptionalTooltip>
      {renderCompete && (
        <Button variant="outlined" color="warning" startIcon={<AppEmoji name="cup" onlyEmoji />} onClick={onComplete}>
          {doneButton}
        </Button>
      )}
      {modal === 'tasks' && <ModalTasks goal={goal} onClose={closeModal} />}
      {modal === 'completion' && <ModalCompletion goal={goal} onClose={closeModal} />}
    </Box>
  )
}
