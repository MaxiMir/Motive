import produce from 'immer'
import { differenceInCalendarDays, differenceInDays } from 'date-fns'
import { CalendarDto, DayDto, GoalDto, RoleDto } from 'dto'
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

const checkOnWeb = (dayDate: string, today: Date, lastDay: boolean): boolean =>
  lastDay && differenceInDays(today, Date.parse(dayDate)) >= SHOW_WEB_AFTER_DAYS

const checkOnTaskForm = (role: RoleDto, daysGone: number): boolean =>
  ['OWNER', 'MEMBER'].includes(role) && daysGone <= 0

const checkOnControls = (role: RoleDto, lastDay: boolean): boolean => !(role === 'OWNER' && !lastDay)

const checkOnCompleteStage = (reactions: boolean, role: RoleDto, goal: GoalDto): boolean =>
  role === 'OWNER' && reactions && goal.stage <= goal.day.stage

type GoalInfo = {
  datesMap: Record<string, number>
  runsForDays: number
  web: boolean
  form: boolean
  controls: boolean
  completeStage: boolean
  forTomorrow: boolean
}

export const getGoalInfo = (goal: GoalDto, role: RoleDto): GoalInfo => {
  const { started, day, calendar } = goal
  const today = new Date()
  const datesMap = getDatesMap(day, calendar)
  const dates = Object.keys(datesMap)
  const lastDay = dates[dates.length - 1] === getDateKey(day.date)
  const daysGone = differenceInCalendarDays(today, Date.parse(day.date))
  const runsForDays = differenceInCalendarDays(today, Date.parse(started))
  const web = checkOnWeb(day.date, today, lastDay)
  const form = checkOnTaskForm(role, daysGone)
  const controls = checkOnControls(role, lastDay)
  const completeStage = checkOnCompleteStage(controls, role, goal)
  const forTomorrow = daysGone === -1

  return {
    datesMap,
    runsForDays,
    web,
    form,
    controls,
    completeStage,
    forTomorrow,
  }
}

export const getGoalNextState = (goals: GoalDto[], goalId: number, day: DayDto): GoalDto[] =>
  produce(goals, (draft: GoalDto[]) => {
    const draftGoal = draft[draft.findIndex((g) => g.id === goalId)]
    draftGoal.day = day
  })
