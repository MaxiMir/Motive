import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Button, Tooltip } from '@mui/material'
import AppEmoji from '@ui/AppEmoji'
import { useMessages } from './hooks/useMessages'

const ModalCompletion = dynamic(() => import('@modules/user/components/GoalCurrent/components/ModalCompletion'))

interface DoneProps {
  forTomorrow: boolean
}

function Done({ forTomorrow }: DoneProps) {
  const messages = useMessages(forTomorrow)
  const [open, setOpen] = useState(false)

  const toggleModal = () => setOpen(!open)

  return (
    <>
      <Tooltip title={messages.title} arrow followCursor>
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
            {messages.buttonText}
          </Button>
        </span>
      </Tooltip>
      {open && <ModalCompletion onClose={toggleModal} />}
    </>
  )
}

export default Done
