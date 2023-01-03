import dynamic from 'next/dynamic'
import { Button } from '@mui/material'
import useToggle from '@hooks/useToggle'
import TooltipArrow from '@ui/styled/TooltipArrow'
import { useMessages } from './hooks/useMessages'

const CompletionModal = dynamic(() => import('@features/confirmation'))

interface DoneProps {
  forTomorrow: boolean
}

function Done({ forTomorrow }: DoneProps) {
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
      {open && <CompletionModal onClose={toggle} />}
    </>
  )
}

export default Done
