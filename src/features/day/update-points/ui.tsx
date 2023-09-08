import { Button } from '@mui/material'
import { red } from '@mui/material/colors'
import { styled } from '@mui/system'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { GoalDto } from 'shared/api'
import Icon from 'shared/ui/Icon'
import TooltipArrow from 'shared/ui/TooltipArrow'
import { useUpdatePoints } from './model'

const CircularProgress = dynamic(() => import('@mui/material/CircularProgress'))

interface UpdatePointsProps extends Pick<GoalDto, 'viewerPoints' | 'day'> {
  goalId: number
}

function UpdatePoints({ goalId, day, viewerPoints }: UpdatePointsProps) {
  const { formatMessage } = useIntl()
  const active = !!viewerPoints?.some((d) => d === day.id)
  const { isLoading, onClick } = useUpdatePoints(goalId, day.id, active)
  const title = formatMessage({ id: 'common.like' })
  const iconColor = active ? red[800] : undefined

  return (
    <TooltipArrow title={title}>
      <StyledButton
        size="small"
        variant="outlined"
        color="inherit"
        active={active}
        disabled={isLoading}
        startIcon={
          !isLoading ? (
            <Icon name="favorite" color={iconColor} />
          ) : (
            <CircularProgress size={18} color="inherit" />
          )
        }
        onClick={onClick}
      />
    </TooltipArrow>
  )
}

const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active: boolean }>(({ theme, active }) => ({
  minWidth: 50,
  height: 30,
  paddingRight: 0,
  borderRadius: 20,
  border: 'none',
  color: active ? red[400] : theme.palette.grey[400],
  backgroundColor: active ? '#3E2526' : '#2b2d31',
  ':disabled': {
    border: 'none',
  },
}))

export default UpdatePoints
