import { Button } from '@mui/material'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { useToggle } from 'shared/lib/hooks'
import Icon from 'shared/ui/Icon'
import TooltipArrow from 'shared/ui/TooltipArrow'

const CreateFeedbackModal = dynamic(() => import('features/feedback/create-feedback'))

interface CreatingProps {
  goalId: number
  dayId: number
  forTomorrow: boolean
}

function Creating({ goalId, dayId, forTomorrow }: CreatingProps) {
  const { formatMessage } = useIntl()
  const [open, toggle] = useToggle()
  const title = !forTomorrow ? '' : formatMessage({ id: 'component.tooltip.tomorrow' })
  const buttonText = formatMessage({ id: 'common.add' })

  return (
    <>
      <TooltipArrow title={title}>
        <Button
          size="small"
          variant="outlined"
          color="secondary"
          startIcon={<Icon name="add" />}
          disabled={forTomorrow}
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
