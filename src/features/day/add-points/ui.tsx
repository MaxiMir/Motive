import { useIntl } from 'react-intl'
import { DayAct } from 'entities/day'
import { GoalDto } from 'shared/api'
import { Emoji } from 'shared/config'
import { useUpdatePoints } from './model'

interface AddPointsProps extends Pick<GoalDto, 'clientPoints' | 'day'> {
  goalId: number
}

function AddPoints({ goalId, day, clientPoints }: AddPointsProps) {
  const { formatMessage } = useIntl()
  const active = !!clientPoints?.some((d) => d === day.id)
  const { isLoading, onClick } = useUpdatePoints(goalId, day.id, active)
  const title = formatMessage({ id: `page.user.topic.title-${active ? 'decrease' : 'increase'}` })

  return (
    <DayAct
      title={title}
      count={day.pointsRated}
      active={active}
      isLoading={isLoading}
      startIcon={Emoji.points}
      onClick={onClick}
    />
  )
}

export default AddPoints
