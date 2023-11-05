import { Button } from '@mui/material'
import { styled } from '@mui/system'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { useToggle } from 'shared/lib/hooks'
import Icon from 'shared/ui/icon'
import TooltipArrow from 'shared/ui/tooltip-arrow'

const CreateConfirmationModal = dynamic(() => import('features/confirmation/create-confirmation'))

interface CompletionProps {
  goalId: number
  forFuture: boolean
}

function Completion({ goalId, forFuture }: CompletionProps) {
  const [open, toggle] = useToggle()
  const { formatMessage } = useIntl()
  const title = formatMessage({ id: !forFuture ? 'common.complete' : 'component.available-later' })

  return (
    <>
      <TooltipArrow title={title}>
        <StyledButton
          size="small"
          variant="contained"
          color="warning"
          disabled={forFuture}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={toggle}
        >
          <Icon name="trophy" />
        </StyledButton>
      </TooltipArrow>
      {open && <CreateConfirmationModal goalId={goalId} onClose={toggle} />}
    </>
  )
}

const StyledButton = styled(Button)({
  minWidth: 50,
  height: 30,
  borderRadius: 20,
})

export default Completion
