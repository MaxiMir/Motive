import { Stack } from '@mui/material'
import { styled } from '@mui/system'
import { useState } from 'react'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import BlueButton from 'shared/ui/BlueButton'
import Icon from 'shared/ui/Icon'
import TooltipArrow from 'shared/ui/TooltipArrow'

const Button = dynamic(() => import('@mui/material/Button'))
const CreateConfirmationModal = dynamic(() => import('features/confirmation/create-confirmation'))
const CreateDayModal = dynamic(() => import('features/day/create-day'))

interface OwnerActsProps {
  goalId: number
  stages: string[]
  dayStage: number
  dayDate: string
}

function OwnerActs({ goalId, stages, dayStage, dayDate }: OwnerActsProps) {
  const { formatMessage } = useIntl()
  const [modal, setModal] = useState<'tasks' | 'completion'>()
  const renderCompete = stages.length === dayStage
  const justifyContent = renderCompete ? 'space-between' : 'flex-end'
  const doneText = formatMessage({ id: 'common.done' })
  const nextText = formatMessage({ id: 'common.next' })

  const onAddTasks = () => setModal('tasks')

  const onComplete = () => setModal('completion')

  const closeModal = () => setModal(undefined)

  return (
    <>
      <Stack direction="row" justifyContent={justifyContent} gap={1}>
        <TooltipArrow title={nextText}>
          <StyledBlueButton size="small" onClick={onAddTasks}>
            <Icon name="arrow_forward" />
          </StyledBlueButton>
        </TooltipArrow>
        {renderCompete && (
          <TooltipArrow title={doneText}>
            <StyledButton size="small" variant="contained" color="warning" onClick={onComplete}>
              <Icon name="trophy" />
            </StyledButton>
          </TooltipArrow>
        )}
      </Stack>
      {modal === 'tasks' && (
        <CreateDayModal goalId={goalId} dayDate={dayDate} onClose={closeModal} />
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
