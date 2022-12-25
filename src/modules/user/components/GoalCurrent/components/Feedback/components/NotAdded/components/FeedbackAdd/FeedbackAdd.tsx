import dynamic from 'next/dynamic'
import { Button, Tooltip } from '@mui/material'
import useToggle from '@hooks/useToggle'
import AppIcon from '@ui/AppIcon'
import { useMessages } from './hooks/useMessages'

const ModalFeedback = dynamic(() => import('./components/ModalFeedback'))

interface FeedbackAddProps {
  forTomorrow: boolean
}

function FeedbackAdd({ forTomorrow }: FeedbackAddProps) {
  const messages = useMessages(forTomorrow)
  const [open, toggle] = useToggle()

  return (
    <>
      <Tooltip title={messages.title} arrow followCursor>
        <span>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<AppIcon name="psychology" />}
            disabled={forTomorrow}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={toggle}
          >
            {messages.buttonText}
          </Button>
        </span>
      </Tooltip>
      {open && <ModalFeedback onClose={toggle} />}
    </>
  )
}

export default FeedbackAdd
