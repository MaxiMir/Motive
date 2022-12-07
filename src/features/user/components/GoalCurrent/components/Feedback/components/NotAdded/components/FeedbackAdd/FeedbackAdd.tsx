import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useIntl } from 'react-intl'
import { Button, Tooltip } from '@mui/material'
import AppIcon from '@ui/AppIcon'

const ModalFeedback = dynamic(() => import('./components/ModalFeedback'))

interface FeedbackAddProps {
  forTomorrow: boolean
}

function FeedbackAdd({ forTomorrow }: FeedbackAddProps) {
  const { formatMessage } = useIntl()
  const [open, setOpen] = useState(false)
  const title = forTomorrow && formatMessage({ id: 'component.tooltip.tomorrow' })
  const buttonText = formatMessage({ id: 'common.add' })

  const toggle = () => setOpen(!open)

  return (
    <>
      <Tooltip title={title} arrow followCursor>
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
            {buttonText}
          </Button>
        </span>
      </Tooltip>
      {open && <ModalFeedback onClose={toggle} />}
    </>
  )
}

export default FeedbackAdd
