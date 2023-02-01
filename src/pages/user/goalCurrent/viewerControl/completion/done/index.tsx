import { Button } from '@mui/material'
import dynamic from 'next/dynamic'
import { useToggle } from 'shared/lib/hooks'
import TooltipArrow from 'shared/ui/TooltipArrow'
import { useMessages } from './lib'

const CreateConfirmationModal = dynamic(() => import('features/confirmation/create-confirmation'))

interface DoneProps {
  goalId: number
  forTomorrow: boolean
}

function Done({ goalId, forTomorrow }: DoneProps) {
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
      {open && <CreateConfirmationModal goalId={goalId} onClose={toggle} />}
    </>
  )
}

export default Done
