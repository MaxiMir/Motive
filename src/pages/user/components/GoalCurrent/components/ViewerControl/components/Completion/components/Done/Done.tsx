import { Button } from '@mui/material'
import dynamic from 'next/dynamic'
import { useGoalContext } from '@pages/user/components/GoalCurrent/hooks/useGoalContext'
import { useToggle } from '@shared/lib/hooks'
import TooltipArrow from '@shared/ui/styled/TooltipArrow'
import { useMessages } from './hooks/useMessages'

const ConfirmationModal = dynamic(() => import('@entities/confirmation'))

interface DoneProps {
  forTomorrow: boolean
}

function Done({ forTomorrow }: DoneProps) {
  const { id } = useGoalContext()
  const messages = useMessages(forTomorrow)
  const [open, toggle] = useToggle()

  return (
    <>
      <TooltipArrow title={messages.title}>
        <Button
          size="small"
          variant="contained"
          disabled={forTomorrow}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={toggle}
        >
          {messages.buttonText}
        </Button>
      </TooltipArrow>
      {open && <ConfirmationModal id={id} onClose={toggle} />}
    </>
  )
}

export default Done
