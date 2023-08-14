import { Button } from '@mui/material'
import { styled } from '@mui/system'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { useToggle } from 'shared/lib/hooks'
import Icon from 'shared/ui/Icon'

const CreateGoalModal = dynamic(() => import('features/goal/create-goal'))

function CreateGoal() {
  const { formatMessage } = useIntl()
  const [open, toggle] = useToggle()
  const buttonText = formatMessage({ id: 'common.create' })

  return (
    <>
      <StyledButton
        size="small"
        variant="text"
        title={buttonText}
        aria-label={buttonText}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        sx={{
          bottom: {
            xs: 72,
            xl: 24,
          },
        }}
        onClick={toggle}
      >
        <Icon name="target" />
      </StyledButton>
      {open && <CreateGoalModal onClose={toggle} />}
    </>
  )
}

const StyledButton = styled(Button)(({ theme }) => ({
  position: 'fixed',
  right: 24,
  bottom: 72,
  minWidth: 'initial',
  width: 65,
  height: 65,
  padding: 0,
  borderRadius: '50%',
  background: `linear-gradient(to top left, ${theme.palette.creativity.dark}, ${theme.palette.support.dark})`,
  zIndex: 100,
}))

export default CreateGoal
