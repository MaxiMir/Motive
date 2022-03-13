import produce from 'immer'
import { differenceInCalendarDays, differenceInDays } from 'date-fns'
import { CalendarDto, ClientDto, DayDto, GoalDto, Member } from 'dto'
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

export const getClientMember = (goal: GoalDto, membership: Member[], client?: ClientDto): Member | undefined =>
  client && membership.find((m) => m.userId === client.id && m.goalId === goal.id)

const checkOnWeb = (dayDate: string, today: Date, lastDay: boolean): boolean =>
  lastDay && differenceInDays(today, Date.parse(dayDate)) >= SHOW_WEB_AFTER_DAYS

const checkOnTaskForm = (day: DayDto, member: Member | undefined, daysGone: number, isOwner: boolean): boolean => {
  if (member) {
    return member.dayId === day.id
  }

  return isOwner && daysGone <= 0
}

const checkOnControls = (lastDay: boolean, isOwner: boolean): boolean => !(isOwner && !lastDay)

const checkOnCompleteStage = (reactions: boolean, goal: GoalDto, isOwner: boolean): boolean =>
  isOwner && reactions && goal.stage <= goal.day.stage

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

export const getGoalInfo = (goal: GoalDto, member: Member | undefined, isOwner: boolean): GoalInfo => {
  const { started, day, calendar } = goal
  const today = new Date()
  const datesMap = getDatesMap(day, calendar)
  const dates = Object.keys(datesMap)
  const lastDay = dates[dates.length - 1] === getDateKey(day.date)
  const daysGone = differenceInCalendarDays(today, Date.parse(day.date))
  const runsForDays = differenceInCalendarDays(today, Date.parse(started))
  const web = checkOnWeb(day.date, today, lastDay)
  const form = checkOnTaskForm(day, member, daysGone, isOwner)
  const controls = checkOnControls(lastDay, isOwner)
  const completeStage = checkOnCompleteStage(controls, goal, isOwner)
  const forTomorrow = daysGone === -1

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
