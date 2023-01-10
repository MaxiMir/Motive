import dynamic from 'next/dynamic'
import { Button } from '@mui/material'
import useToggle from '@hooks/useToggle'
import AppIcon from '@ui/AppIcon'
import TooltipArrow from '@ui/styled/TooltipArrow'
import { useMessages } from './hooks/useMessages'

const FeedbackModal = dynamic(() => import('./components/FeedbackModal'))

interface FeedbackAddProps {
  forTomorrow: boolean
}

function FeedbackAdd({ forTomorrow }: FeedbackAddProps) {
  const messages = useMessages(forTomorrow)
  const [open, toggle] = useToggle()

  return (
    <>
      <TooltipArrow title={messages.title}>
        <Button
          size="small"
          variant="outlined"
          color="secondary"
          startIcon={<AppIcon name="psychology" />}
          disabled={forTomorrow}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={toggle}
        >
          {messages.buttonText}
        </Button>
      </TooltipArrow>
      {open && <FeedbackModal onClose={toggle} />}
    </>
  )
}

export default FeedbackAdd
