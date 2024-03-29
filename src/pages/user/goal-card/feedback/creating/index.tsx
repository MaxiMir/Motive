import { Button } from '@mui/material'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { useToggle } from 'shared/lib/hooks'
import Icon from 'shared/ui/icon'
import TooltipArrow from 'shared/ui/tooltip-arrow'

const CreateFeedbackModal = dynamic(() => import('features/feedback/create-feedback'))

interface CreatingProps {
  goalId: number
  dayId: number
  forFuture: boolean
}

function Creating({ goalId, dayId, forFuture }: CreatingProps) {
  const { formatMessage } = useIntl()
  const [open, toggle] = useToggle()
  const title = !forFuture ? '' : formatMessage({ id: 'component.available-later' })
  const buttonText = formatMessage({ id: 'common.add' })

  return (
    <>
      <TooltipArrow title={title}>
        <Button
          size="small"
          variant="outlined"
          startIcon={<Icon name="add" />}
          disabled={forFuture}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={toggle}
        >
          {buttonText}
        </Button>
      </TooltipArrow>
      {open && <CreateFeedbackModal goalId={goalId} dayId={dayId} onClose={toggle} />}
    </>
  )
}

export default Creating
