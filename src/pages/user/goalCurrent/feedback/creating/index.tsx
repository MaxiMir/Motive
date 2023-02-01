import { Button } from '@mui/material'
import dynamic from 'next/dynamic'
import { useToggle } from 'shared/lib/hooks'
import Icon from 'shared/ui/Icon'
import TooltipArrow from 'shared/ui/TooltipArrow'
import { useMessages } from './lib'

const CreateFeedbackModal = dynamic(() => import('features/feedback/create-feedback'))

interface CreatingProps {
  goalId: number
  dayId: number
  forTomorrow: boolean
}

function Creating({ goalId, dayId, forTomorrow }: CreatingProps) {
  const messages = useMessages(forTomorrow)
  const [open, toggle] = useToggle()

  return (
    <>
      <TooltipArrow title={messages.title}>
        <Button
          size="small"
          variant="outlined"
          color="secondary"
          startIcon={<Icon name="psychology" />}
          disabled={forTomorrow}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={toggle}
        >
          {messages.buttonText}
        </Button>
      </TooltipArrow>
      {open && <CreateFeedbackModal goalId={goalId} dayId={dayId} onClose={toggle} />}
    </>
  )
}

export default Creating
