import { Button } from '@mui/material'
import { styled } from '@mui/system'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { useToggle } from 'shared/lib/hooks'
import Icon from 'shared/ui/Icon'
import TooltipArrow from 'shared/ui/TooltipArrow'

const CreateGoalModal = dynamic(() => import('features/goal/create-goal'))

function CreateGoal() {
  const { formatMessage } = useIntl()
  const [open, toggle] = useToggle()
  const buttonText = formatMessage({ id: 'common.create-goal' })

  return (
    <>
      <TooltipArrow title={buttonText}>
        <StyledButton
          size="small"
          variant="text"
          data-unit="create-goal"
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          sx={{
            bottom: {
              xs: 70,
              lg: 24,
            },
          }}
          onClick={toggle}
        >
          <Icon name="target" />
        </StyledButton>
      </TooltipArrow>
      {open && <CreateGoalModal onClose={toggle} />}
    </>
  )
}

const StyledButton = styled(Button)(({ theme }) => ({
  position: 'fixed',
  right: 20,
  minWidth: 'initial',
  width: 48,
  height: 48,
  padding: 0,
  borderRadius: '50%',
  zIndex: 100,
  background: `linear-gradient(to top left, ${theme.palette.creativity.dark}, ${theme.palette.support.dark})`,
}))

export default CreateGoal
