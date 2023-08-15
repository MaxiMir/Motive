import { Button } from '@mui/material'
import { styled } from '@mui/system'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { useToggle } from 'shared/lib/hooks'
import Icon from 'shared/ui/Icon'
import TooltipArrow from 'shared/ui/TooltipArrow'

const CreateGoalModal = dynamic(() => import('features/goal/create-goal'))

interface CreateGoalProps {
  fixed?: boolean
}

function CreateGoal({ fixed }: CreateGoalProps) {
  const { formatMessage } = useIntl()
  const [open, toggle] = useToggle()
  const buttonText = formatMessage({ id: 'common.create' })

  return (
    <>
      {!fixed ? (
        <StyledButton
          variant="contained"
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          startIcon={<Icon name="target" />}
          sx={{
            width: '100%',
            color: 'common.white',
          }}
          onClick={toggle}
        >
          {buttonText}
        </StyledButton>
      ) : (
        <TooltipArrow title={buttonText}>
          <StyledButton
            size="small"
            variant="text"
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            sx={{
              position: 'fixed',
              right: 24,
              bottom: 24,
              minWidth: 'initial',
              width: 64,
              height: 64,
              padding: 0,
              borderRadius: '50%',
              zIndex: 100,
            }}
            onClick={toggle}
          >
            <Icon name="target" />
          </StyledButton>
        </TooltipArrow>
      )}
      {open && <CreateGoalModal onClose={toggle} />}
    </>
  )
}

const StyledButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(to top left, ${theme.palette.creativity.dark}, ${theme.palette.support.dark})`,
}))

export default CreateGoal
