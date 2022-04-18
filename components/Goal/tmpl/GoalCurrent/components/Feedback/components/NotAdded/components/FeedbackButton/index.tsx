import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Button } from '@mui/material'
import { GoalDto } from 'dto'
import { Locale } from 'hooks/useLocale'
import AppIcon from 'components/UI/AppIcon'
import OptionalTooltip from 'components/OptionalTooltip'
import i18n from './i18n'

const Modal = dynamic(() => import('components/Modal'))

export interface FeedbackButtonProps {
  goal: GoalDto
  forTomorrow: boolean
  locale: Locale
}

export default function FeedbackButton({ goal, forTomorrow, locale }: FeedbackButtonProps): JSX.Element {
  const [open, setOpen] = useState(false)
  const { button } = i18n[locale]

  const toggle = () => setOpen(!open)

  return (
    <>
      <OptionalTooltip tmpl="tomorrow" wrap={forTomorrow} followCursor>
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<AppIcon name="psychology" />}
          disabled={forTomorrow}
          onClick={toggle}
        >
          {button}
        </Button>
      </OptionalTooltip>
      {open && <Modal tmpl="feedback" goal={goal} onClose={toggle} />}
    </>
  )
}
