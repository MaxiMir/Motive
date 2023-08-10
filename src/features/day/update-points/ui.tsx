import { Button } from '@mui/material'
import { red } from '@mui/material/colors'
import { withStyles } from '@mui/styles'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { GoalDto } from 'shared/api'
import { useFormatNumber } from 'shared/lib/hooks'
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
  const title = formatMessage({ id: `page.user.topic.title-${active ? 'decrease' : 'increase'}` })
  const formatNumber = useFormatNumber()
  const shownCount = formatNumber(day.pointsRated)
  const iconColor = active ? red[800] : undefined

  return (
    <TooltipArrow title={title}>
      <StyledButton
        size="small"
        variant="outlined"
        color="inherit"
        disabled={isLoading}
        startIcon={
          !isLoading ? (
            <Icon name="favorite" color={iconColor} />
          ) : (
            <CircularProgress size={18} color="inherit" />
          )
        }
        sx={(theme) => ({
          color: active ? red[400] : theme.palette.grey[400],
          backgroundColor: active ? '#3E2526' : '#2b2d31',
        })}
        onClick={onClick}
      >
        {shownCount}
      </StyledButton>
    </TooltipArrow>
  )
}

const StyledButton = withStyles({
  root: {
    minWidth: 55,
    height: 30,
    borderRadius: 20,
    border: 'none',
    transition: 'all .3s',
  },
  startIcon: {
    width: 18,
  },
})(Button)

export default UpdatePoints
