import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Box, Button } from '@mui/material'
import { GoalDto } from 'dto'
import useLocale from 'hooks/useLocale'
import TooltipTomorrow from 'components/Goal/tmpl/GoalCurrent/components/TooltipTomorrow'
import AppEmoji from 'components/UI/AppEmoji'
import i18n from './i18n'

const Modal = dynamic(() => import('components/Modal'))

export interface OwnerProps {
  goal: GoalDto
  forTomorrow: boolean
}

export default function Owner({ goal, forTomorrow }: OwnerProps): JSX.Element {
  const { locale } = useLocale()
  const [open, setOpen] = useState(false)
  const { buttonName } = i18n[locale]

  const toggleModal = () => setOpen(!open)

  return (
    <Box display="flex" justifyContent="flex-end">
      <TooltipTomorrow forTomorrow={forTomorrow}>
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<AppEmoji name="feedback" onlyEmoji />}
          disabled={forTomorrow}
          onClick={toggleModal}
        >
          {buttonName}
        </Button>
      </TooltipTomorrow>
      {open && <Modal tmpl="feedback" goal={goal} onClose={toggleModal} />}
    </Box>
  )
}
