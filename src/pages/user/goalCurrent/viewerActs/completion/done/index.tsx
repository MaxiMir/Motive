import { Button } from '@mui/material'
import { styled } from '@mui/system'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { useToggle } from 'shared/lib/hooks'
import Icon from 'shared/ui/Icon'
import TooltipArrow from 'shared/ui/TooltipArrow'

const CreateConfirmationModal = dynamic(() => import('features/confirmation/create-confirmation'))

interface DoneProps {
  goalId: number
  forFuture: boolean
}

function Done({ goalId, forFuture }: DoneProps) {
  const [open, toggle] = useToggle()
  const { formatMessage } = useIntl()
  const title = formatMessage({ id: !forFuture ? 'common.done' : 'component.available-later' })

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

export default Done
