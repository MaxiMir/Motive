import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Box, Button } from '@mui/material'
import { GoalDto } from 'dto'
import TooltipTomorrow from 'components/Goal/tmpl/GoalCurrent/components/TooltipTomorrow'
import AppEmoji from 'components/UI/AppEmoji'

const Modal = dynamic(() => import('components/Modal'))

export interface OwnerProps {
  goal: GoalDto
  forTomorrow: boolean
}

export default function Owner({ goal, forTomorrow }: OwnerProps): JSX.Element {
  const [open, setOpen] = useState(false)

  const toggleModal = () => setOpen(!open)

  return (
    <Box display="flex" justifyContent="flex-end">
      <TooltipTomorrow forTomorrow={forTomorrow}>
        <Button
          variant="outlined"
          color="warning"
          startIcon={<AppEmoji name="finish" onlyEmoji />}
          disabled={forTomorrow}
          onClick={toggleModal}
        >
          End of day
        </Button>
      </TooltipTomorrow>
      {open && <Modal tmpl="feedback" goal={goal} onClose={toggleModal} />}
    </Box>
  )
}
