import dynamic from 'next/dynamic'
import { Button } from '@mui/material'
import { GoalDto, MemberDto } from 'dto'
import AppEmoji from 'components/UI/AppEmoji'
import TooltipTomorrow from 'components/Goal/tmpl/GoalCurrent/components/TooltipTomorrow'
import { getToday } from 'helpers/date'
import { useSendEndOfDay } from './hook'

const CircularProgress = dynamic(() => import('@mui/material/CircularProgress'))

interface EndOfDayProps {
  goal: GoalDto
  nextDayId: number
  forTomorrow: boolean
  clientMember: MemberDto
}

export default function EndOfDay({ goal, nextDayId, forTomorrow, clientMember }: EndOfDayProps): JSX.Element {
  const { isLoading, mutate } = useSendEndOfDay(goal)

  const onClick = () => {
    mutate({ id: clientMember.id, dayId: nextDayId, lastEndOfDay: getToday() })
  }

  return (
    <TooltipTomorrow forTomorrow={forTomorrow}>
      <Button
        variant="outlined"
        color="secondary"
        disabled={forTomorrow || isLoading}
        startIcon={
          isLoading ? <CircularProgress size="0.9rem" color="primary" /> : <AppEmoji name="finish" onlyEmoji />
        }
        onClick={onClick}
      >
        Next
      </Button>
    </TooltipTomorrow>
  )
}
