import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Button, Tooltip } from '@mui/material'
import { GoalDto } from '@dto'
import AppEmoji from '@ui/AppEmoji'
import { useIntl } from 'react-intl'

const ModalCompletion = dynamic(() => import('@components/Modal/ModalCompletion'))

interface DoneProps {
  goal: GoalDto
  forTomorrow: boolean
}

export default function Done({ goal, forTomorrow }: DoneProps) {
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
      {open && <ModalCompletion goal={goal} onClose={toggleModal} />}
    </>
  )
}
