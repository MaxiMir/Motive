import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Box, Button } from '@mui/material'
import { GoalDto } from 'dto'
import useLocale from 'hooks/useLocale'
import OptionalTooltip from 'components/OptionalTooltip'
import AppEmoji from 'components/UI/AppEmoji'
import i18n from './i18n'

const Modal = dynamic(() => import('components/Modal'))

export interface OwnerProps {
  goal: GoalDto
  forTomorrow: boolean
}

export default function Owner({ goal, forTomorrow }: OwnerProps): JSX.Element {
  const { stages, day } = goal
  const { locale } = useLocale()
  const [modal, setModal] = useState<'tasks' | 'completion' | 'feedback'>()
  const { nextButton, doneButton, feedbackButton } = i18n[locale]
  const isComplete = stages.length === day.stage
  const feedbackAdded = !!goal.day.feedback
  const renderCompete = stages.length === day.stage && feedbackAdded

  const onAddTasks = () => setModal('tasks')

  const onComplete = () => setModal('completion')

  const onAddFeedback = () => setModal('feedback')

  const closeModal = () => setModal(undefined)

  return (
    <Box display="flex" justifyContent={isComplete ? 'space-between' : 'flex-end'}>
      <OptionalTooltip tmpl="feedback" wrap={!feedbackAdded}>
        <Button
          variant="outlined"
          disabled={!feedbackAdded}
          startIcon={<AppEmoji name="next" onlyEmoji />}
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
      {!feedbackAdded && (
        <OptionalTooltip tmpl="tomorrow" wrap={forTomorrow}>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<AppEmoji name="feedback" onlyEmoji />}
            disabled={forTomorrow}
            onClick={onAddFeedback}
          >
            {feedbackButton}
          </Button>
        </OptionalTooltip>
      )}
      {modal === 'tasks' && <Modal tmpl="tasks" goal={goal} onClose={closeModal} />}
      {modal === 'completion' && <Modal tmpl="completion" goal={goal} onClose={closeModal} />}
      {modal === 'feedback' && <Modal tmpl="feedback" goal={goal} onClose={closeModal} />}
    </Box>
  )
}
