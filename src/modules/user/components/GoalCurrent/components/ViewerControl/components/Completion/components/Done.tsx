import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Button, Tooltip } from '@mui/material'
import AppEmoji from '@ui/AppEmoji'
import { useIntl } from 'react-intl'

const ModalCompletion = dynamic(() => import('@modules/user/components/GoalCurrent/components/ModalCompletion'))

interface DoneProps {
  forTomorrow: boolean
}

function Done({ forTomorrow }: DoneProps) {
  const { formatMessage } = useIntl()
  const [open, setOpen] = useState(false)
  const title = forTomorrow && formatMessage({ id: 'component.tooltip.tomorrow' })
  const buttonText = formatMessage({ id: 'common.done' })

  const toggleModal = () => setOpen(!open)

  return (
    <>
      <Tooltip title={title} arrow followCursor>
        <span>
          <Button
            variant="outlined"
            color="warning"
            disabled={forTomorrow}
            startIcon={<AppEmoji name="cup" onlyEmoji />}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={toggleModal}
          >
            {buttonText}
          </Button>
        </span>
      </Tooltip>
      {open && <ModalCompletion onClose={toggleModal} />}
    </>
  )
}

export default Done
