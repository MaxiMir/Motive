import { differenceInCalendarDays, startOfDay } from 'date-fns'
import { ViewerPart } from 'entities/viewer'
import { GoalDto } from 'shared/api'

export type Interaction = ReturnType<typeof getInteraction>

export function getInteraction(goal: GoalDto, part: ViewerPart) {
  const { day, completed, calendar } = goal
  const daysGone = differenceInCalendarDays(new Date(), Date.parse(day.date))

  return {
    daysGone,
    canEdit: !part.member ? part.all : part.page && part.member.dayId === day.id,
    forFuture: !part.member
      ? daysGone <= -1
      : differenceInCalendarDays(Date.parse(part.member.updated), startOfDay(new Date())) >= 0,
    lastDay: calendar?.at(-1)?.date === day.date,
    viewerControls: !part.goal,
    ownerControls: !part.goal ? false : part.page && !completed,
  }
}
