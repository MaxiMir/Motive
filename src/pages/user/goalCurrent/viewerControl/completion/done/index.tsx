import { Button } from '@mui/material'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { useToggle } from 'shared/lib/hooks'
import TooltipArrow from 'shared/ui/TooltipArrow'

const CreateConfirmationModal = dynamic(() => import('features/confirmation/create-confirmation'))

interface DoneProps {
  goalId: number
  forTomorrow: boolean
}

function Done({ goalId, forTomorrow }: DoneProps) {
  const [open, toggle] = useToggle()
  const { formatMessage } = useIntl()
  const title = !forTomorrow ? '' : formatMessage({ id: 'component.tooltip.tomorrow' })
  const buttonText = formatMessage({ id: 'common.done' })

  return (
    <>
      <TooltipArrow title={title}>
        <Button
          size="small"
          variant="contained"
          disabled={forTomorrow}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={toggle}
        >
          {buttonText}
        </Button>
      </TooltipArrow>
      {open && <CreateConfirmationModal goalId={goalId} onClose={toggle} />}
    </>
  )
}

export default Done
