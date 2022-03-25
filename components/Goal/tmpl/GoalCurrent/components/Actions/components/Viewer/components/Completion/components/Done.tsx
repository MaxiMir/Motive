import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Button } from '@material-ui/core'
import { GoalDto } from 'dto'
import TooltipTomorrow from 'components/Goal/tmpl/GoalCurrent/components/TooltipTomorrow'
import AppEmoji from 'components/UI/AppEmoji'

const Modal = dynamic(() => import('components/Modal'))

interface DoneProps {
  goal: GoalDto
  forTomorrow: boolean
}

export default function Done({ goal, forTomorrow }: DoneProps): JSX.Element {
  const [open, setOpen] = useState(false)

  const toggleModal = () => setOpen(!open)

  return (
    <TooltipTomorrow forTomorrow={forTomorrow}>
      <Button
        variant="outlined"
        color="secondary"
        disabled={forTomorrow}
        startIcon={<AppEmoji name="cup" onlyEmoji />}
        onClick={toggleModal}
      >
        Done
      </Button>
      {open && <Modal tmpl="completion" goal={goal} onClose={toggleModal} />}
    </TooltipTomorrow>
  )
}
