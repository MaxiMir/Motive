import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Button } from '@mui/material'
import { GoalDto } from 'dto'
import { Locale } from 'hooks/useLocale'
import AppIcon from 'components/ui/AppIcon'
import OptionalTooltip from 'components/OptionalTooltip'
import i18n from './i18n'

const ModalFeedback = dynamic(() => import('components/Modal/ModalFeedback'))

export interface FeedbackButtonProps {
  goal: GoalDto
  forTomorrow: boolean
  locale: Locale
}

export default function FeedbackButton({ goal, forTomorrow, locale }: FeedbackButtonProps) {
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
      {open && <ModalFeedback goal={goal} onClose={toggle} />}
    </>
  )
}
