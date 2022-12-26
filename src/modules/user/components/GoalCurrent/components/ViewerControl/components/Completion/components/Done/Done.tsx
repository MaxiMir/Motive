import dynamic from 'next/dynamic'
import { Button } from '@mui/material'
import useToggle from '@hooks/useToggle'
import AppEmoji from '@ui/AppEmoji'
import TooltipArrow from '@ui/styled/TooltipArrow'
import { useMessages } from './hooks/useMessages'

const CompletionModal = dynamic(
  () => import('@modules/user/components/GoalCurrent/components/CompletionModal'),
)

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
          variant="outlined"
          color="warning"
          disabled={forTomorrow}
          startIcon={<AppEmoji name="cup" onlyEmoji />}
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
