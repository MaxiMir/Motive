import { differenceInCalendarDays, startOfDay } from 'date-fns'
import { ViewerPart } from 'entities/viewer'
import { GoalDto } from 'shared/api'

export type Interaction = ReturnType<typeof getInteraction>

export function getInteraction(goal: GoalDto, viewerPart: ViewerPart) {
  const { day, completed, calendar, member } = goal
  const midnight = startOfDay(new Date())
  const daysGoneForOwner = differenceInCalendarDays(new Date(), Date.parse(day.date))

  return {
    daysGoneForOwner,
    canEdit: !viewerPart.member
      ? viewerPart.all
      : viewerPart.page && viewerPart.member.dayId === day.id,
    daysGone: !member
      ? daysGoneForOwner
      : differenceInCalendarDays(midnight, Date.parse(member.updated)),
    lastDay: !member ? calendar?.at(-1)?.date === day.date : member.dayId === day.id,
    forFuture: !viewerPart.member
      ? daysGoneForOwner <= -1
      : differenceInCalendarDays(Date.parse(viewerPart.member.updated), midnight) > 0,
    viewerControls: !viewerPart.goal,
    ownerControls: !viewerPart.goal ? false : viewerPart.page && !completed,
  }
}
