import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Button } from '@mui/material'
import { GoalDto } from 'dto'
import useLocale from 'hooks/useLocale'
import OptionalTooltip from 'components/OptionalTooltip'
import AppEmoji from 'components/UI/AppEmoji'
import i18n from './i18n'

const Modal = dynamic(() => import('components/Modal'))

interface DoneProps {
  goal: GoalDto
  forTomorrow: boolean
}

export default function Done({ goal, forTomorrow }: DoneProps): JSX.Element {
  const { locale } = useLocale()
  const [open, setOpen] = useState(false)
  const { button } = i18n[locale]

  const toggleModal = () => setOpen(!open)

  return (
    <OptionalTooltip tmpl="tomorrow" wrap={forTomorrow} followCursor>
      <Button
        variant="outlined"
        color="warning"
        disabled={forTomorrow}
        startIcon={<AppEmoji name="cup" onlyEmoji />}
        onClick={toggleModal}
      >
        {button}
      </Button>
      {open && <Modal tmpl="completion" goal={goal} onClose={toggleModal} />}
    </OptionalTooltip>
  )
}
