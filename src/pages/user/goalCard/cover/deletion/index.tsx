import { Button } from '@mui/material'
import { red } from '@mui/material/colors'
import { styled } from '@mui/system'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { useToggle } from 'shared/lib/hooks'
import Icon from 'shared/ui/Icon'
import TooltipArrow from 'shared/ui/TooltipArrow'

const DeleteGoalModal = dynamic(() => import('features/goal/delete-goal'))

interface DeletionProps {
  goalId: number
}

function Deletion({ goalId }: DeletionProps) {
  const { formatMessage } = useIntl()
  const [open, toggle] = useToggle()
  const title = formatMessage({ id: 'common.goal-delete' })

  return (
    <>
      <TooltipArrow title={title}>
        <StyledButton size="small" onClick={toggle}>
          <Icon name="delete" fontSize={18} />
        </StyledButton>
      </TooltipArrow>
      {open && <DeleteGoalModal goalId={goalId} onClose={toggle} />}
    </>
  )
}

const StyledButton = styled(Button)(({ theme }) => ({
  minWidth: 'initial',
  width: 36,
  height: 36,
  border: `2px solid ${theme.palette.grey[900]}`,
  color: theme.palette.common.white,
  borderColor: red[800],
  backgroundColor: red[800],
  ':hover': {
    backgroundColor: red[400],
  },
}))

export default Deletion
