import produce from 'immer'
import { differenceInCalendarDays, differenceInDays } from 'date-fns'
import { CalendarDto, ClientDto, DayDto, GoalDto, MemberDto, TaskDto } from 'dto'
import { SEARCH_PARAMS, setQueryParams } from 'helpers/url'
import { getDateKey } from './components/Calendar/helper'

const SHOW_WEB_AFTER_DAYS = 14

export const getDatesMap = (day: DayDto, calendar?: CalendarDto[]): Record<string, number> => {
  if (!calendar) {
    return { [getDateKey(day.date)]: day.id }
  }

  return calendar.reduce((acc, { id, date }) => ({ ...acc, [getDateKey(date)]: id }), {})
}

export const getGoalHref = (userHref: string, goal: GoalDto): string => {
  const { id, day } = goal

  return setQueryParams(userHref, { [SEARCH_PARAMS.SCROLL]: goal.id, [SEARCH_PARAMS.DATES]: `${id}:${day.id}` })
}

export const getMember = (goal: GoalDto, membership: MemberDto[], client?: ClientDto): MemberDto | undefined =>
  client && membership.find((m) => m.userId === client.id && m.goalId === goal.id)

export const checkOnCompleted = (task: TaskDto, clientPage: boolean, member?: MemberDto): boolean =>
  !member || !clientPage ? task.completed : member.completedTasks.includes(task.id)

export const checkOnFire = (task: TaskDto, daysGone: number): boolean =>
  !daysGone && task.completedByOther && !task.completed

const checkOnCompleteStage = (reactions: boolean, goal: GoalDto, clientGoal: boolean): boolean =>
  clientGoal && reactions && goal.stage <= goal.day.stage

type GoalInfo = {
  datesMap: Record<string, number>
  daysGone: number
  runsForDays: number
  web: boolean
  form: boolean
  controls: boolean
  completeStage: boolean
  forTomorrow: boolean
}

export const getGoalInfo = (goal: GoalDto, clientGoal: boolean, clientPage: boolean, member?: MemberDto): GoalInfo => {
  const { started, day, calendar } = goal
  const today = new Date()
  const datesMap = getDatesMap(day, calendar)
  const dates = Object.keys(datesMap)
  const lastDay = dates[dates.length - 1] === getDateKey(day.date)
  const daysGone = differenceInCalendarDays(today, Date.parse(day.date))
  const runsForDays = differenceInCalendarDays(today, Date.parse(started))
  const web = lastDay && differenceInDays(today, Date.parse(day.date)) >= SHOW_WEB_AFTER_DAYS
  const form = checkOnTaskForm()
  const controls = !clientGoal || lastDay
  const completeStage = checkOnCompleteStage(controls, goal, clientGoal)
  const forTomorrow = daysGone === -1

  function checkOnTaskForm() {
    if (clientPage && member) {
      return member.dayId === day.id
    }

    return clientGoal && daysGone <= 0
  }

  return {
    datesMap,
    daysGone,
    runsForDays,
    web,
    form,
    controls,
    completeStage,
    forTomorrow,
  }
}

export const getGoalNextState = (goals: GoalDto[], goalId: number, day: DayDto): GoalDto[] =>
  produce(goals, (draft) => {
    const draftGoal = draft[draft.findIndex((g) => g.id === goalId)]
    draftGoal.day = day
  })
