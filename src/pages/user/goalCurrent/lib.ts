import { differenceInCalendarDays, startOfDay } from 'date-fns'
import { ViewerPart } from 'entities/viewer'
import { GoalDto } from 'shared/api'

export type Interaction = ReturnType<typeof getInteraction>

export function getInteraction(goal: GoalDto, viewerPart: ViewerPart) {
  const { day, completed, calendar } = goal
  const midnight = startOfDay(new Date())
  const daysGone = differenceInCalendarDays(new Date(), Date.parse(day.date))

  return {
    daysGone,
    canEdit: !viewerPart.member
      ? viewerPart.all
      : viewerPart.page && viewerPart.member.dayId === day.id,
    forFuture: !viewerPart.member
      ? daysGone <= -1
      : differenceInCalendarDays(Date.parse(viewerPart.member.updated), midnight) > 0,
    lastDay: calendar?.at(-1)?.date === day.date,
    viewerControls: !viewerPart.goal,
    ownerControls: !viewerPart.goal ? false : viewerPart.page && !completed,
  }
}
