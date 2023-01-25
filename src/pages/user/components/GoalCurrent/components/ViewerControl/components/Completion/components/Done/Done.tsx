import dynamic from 'next/dynamic'
import { Button } from '@mui/material'
import useToggle from '@lib/hooks/useToggle'
import TooltipArrow from '@ui/styled/TooltipArrow'
import { useGoalContext } from '@pages/user/components/GoalCurrent/hooks/useGoalContext'
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
