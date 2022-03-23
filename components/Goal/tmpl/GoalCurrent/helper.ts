import produce from 'immer'
import { differenceInCalendarDays } from 'date-fns'
import { CalendarDto, DayDto, GoalDto, MemberDto, OwnershipDto, TaskDto } from 'dto'
import { SEARCH_PARAMS, setQueryParams } from 'helpers/url'
import { getDateKey } from './components/Calendar/helper'

const SHOW_WEB_AFTER_DAYS = 14

export const getDatesMap = (day: DayDto, calendar?: CalendarDto[]): Record<string, number> => {
  if (!calendar) {
    return { [getDateKey(day.date)]: day.id }
  }

  return calendar.reduce((acc, { id, date }) => ({ ...acc, [getDateKey(date)]: id }), {})
}

export const getClientOwnership = (
  goal: GoalDto,
  clientId: number | undefined,
  clientPage: boolean,
  clientMembership: MemberDto[],
): OwnershipDto => {
  const clientGoal = goal.owner.id === clientId
  const clientMember = getMember(goal, clientMembership, clientId)

  return { page: clientPage, goal: clientGoal, member: clientMember }
}

export const redefineTasks = (tasks: TaskDto[], userMember?: MemberDto): TaskDto[] =>
  tasks.map((task) =>
    produce(task, (draft) => {
      if (!userMember) return

      draft.completed = userMember.completedTasks.includes(draft.id)
    }),
  )

export const getGoalHref = (userHref: string, goal: GoalDto): string => {
  const { id, day } = goal

  return setQueryParams(userHref, { [SEARCH_PARAMS.SCROLL]: goal.id, [SEARCH_PARAMS.DATES]: `${id}:${day.id}` })
}

export const getMember = (goal: GoalDto, membership: MemberDto[], userId?: number): MemberDto | undefined =>
  (userId && membership.find((m) => m.userId === userId && m.goalId === goal.id)) || undefined

export type GoalInfo = {
  datesMap: Record<string, number>
  daysGone: number
  daysGoneForOwner: number
  runsForDays: number
  web: boolean
  form: boolean
  controls: boolean
  completeStage: boolean
  forTomorrow: boolean
}

export const getGoalInfo = (goal: GoalDto, clientOwnership: OwnershipDto): GoalInfo => {
  const { started, day, calendar } = goal
  const today = new Date()
  const datesMap = getDatesMap(day, calendar)
  const dates = Object.keys(datesMap)
  const lastDay = dates[dates.length - 1] === getDateKey(day.date)
  const controls = !clientOwnership.goal || lastDay
  const completeStage = clientOwnership.goal && controls && goal.stage <= goal.day.stage
  const daysGoneForOwner = differenceInCalendarDays(today, Date.parse(day.date))
  const runsForDays = differenceInCalendarDays(today, Date.parse(started))
  const daysGone = getDaysGone()
  const web = checkOnWeb()
  const form = checkOnForm()
  const forTomorrow = checkOnForTomorrow()

  function getDaysGone() {
    if (!clientOwnership.member) {
      return daysGoneForOwner
    }

    if (!clientOwnership.member.lastEndOfDay) {
      return 0
    }

    return differenceInCalendarDays(Date.parse(clientOwnership.member.lastEndOfDay), new Date())
  }

  function checkOnWeb() {
    if (clientOwnership.member) {
      return clientOwnership.member.dayId === day.id && daysGone >= SHOW_WEB_AFTER_DAYS
    }

    return lastDay && daysGoneForOwner >= SHOW_WEB_AFTER_DAYS
  }

  function checkOnForm() {
    if (clientOwnership.page && clientOwnership.member) {
      return clientOwnership.member.dayId === day.id && daysGone <= 0
    }

    return clientOwnership.goal && daysGone <= 0
  }

  function checkOnForTomorrow() {
    if (!clientOwnership.member) {
      return daysGone === -1
    }

    if (!clientOwnership.member.lastEndOfDay) {
      return false
    }

    return !differenceInCalendarDays(Date.parse(clientOwnership.member.lastEndOfDay), today)
  }

  return {
    datesMap,
    daysGone,
    daysGoneForOwner,
    runsForDays,
    web,
    form,
    controls,
    completeStage,
    forTomorrow,
  }
}
