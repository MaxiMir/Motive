import { Stack } from '@mui/material'
import { styled } from '@mui/system'
import { useState } from 'react'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { CalendarDto } from 'shared/api'
import BlueButton from 'shared/ui/blue-button'
import Icon from 'shared/ui/icon'
import TooltipArrow from 'shared/ui/tooltip-arrow'

const Button = dynamic(() => import('@mui/material/Button'))
const CreateConfirmationModal = dynamic(() => import('features/confirmation/create-confirmation'))
const CreateDayModal = dynamic(() => import('features/day/create-day'))

interface OwnerActsProps {
  goalId: number
  stages: string[]
  dayStage: number
  calendar: CalendarDto
}

function OwnerActs({ goalId, stages, dayStage, calendar }: OwnerActsProps) {
  const { formatMessage } = useIntl()
  const [modal, setModal] = useState<'tasks' | 'completion'>()
  const renderCompete = stages.length === dayStage
  const justifyContent = renderCompete ? 'space-between' : 'flex-end'
  const completeText = formatMessage({ id: 'common.complete' })
  const nextText = formatMessage({ id: 'common.next' })

  const onAddTasks = () => setModal('tasks')

  const onComplete = () => setModal('completion')

  const closeModal = () => setModal(undefined)

  return (
    <>
      <Stack direction="row" justifyContent={justifyContent} gap={1}>
        {renderCompete && (
          <TooltipArrow title={completeText}>
            <StyledButton size="small" variant="contained" color="warning" onClick={onComplete}>
              <Icon name="trophy" />
            </StyledButton>
          </TooltipArrow>
        )}
        <TooltipArrow title={nextText}>
          <StyledBlueButton size="small" onClick={onAddTasks}>
            <Icon name="arrow_forward" />
          </StyledBlueButton>
        </TooltipArrow>
      </Stack>
      {modal === 'tasks' && (
        <CreateDayModal goalId={goalId} calendar={calendar} onClose={closeModal} />
      )}
      {modal === 'completion' && <CreateConfirmationModal goalId={goalId} onClose={closeModal} />}
    </>
  )
}

const STYLES = {
  minWidth: 50,
  height: 30,
  borderRadius: 20,
}

const StyledBlueButton = styled(BlueButton)(STYLES)

const StyledButton = styled(Button)(STYLES)

export default OwnerActs
