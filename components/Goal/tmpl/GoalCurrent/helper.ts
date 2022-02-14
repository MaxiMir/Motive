import differenceInDays from 'date-fns/differenceInDays'
import { DayDto, GoalDto, RoleDto, UserBaseDto } from 'dto'
import { SEARCH_PARAMS, setQueryParams } from 'helpers/url'
import { differenceInCalendarDays } from 'date-fns'
import produce from 'immer'

const SHOW_WEB_AFTER_DAYS = 14

export const getGoalHref = (userHref: string, goal: GoalDto): string => {
  const { id, day } = goal

  return setQueryParams(userHref, { [SEARCH_PARAMS.SCROLL]: goal.id, [SEARCH_PARAMS.DATES]: `${id}:${day.id}` })
}

const checkOnWeb = (dayDate: string, currentDate: Date, lastDay: boolean): boolean =>
  lastDay && differenceInDays(currentDate, Date.parse(dayDate)) >= SHOW_WEB_AFTER_DAYS

export const getRole = (goal: GoalDto, client?: UserBaseDto): RoleDto => {
  switch (true) {
    case goal.owner.id === client?.id:
      return 'OWNER'
    default:
      return 'GUEST'
  }
}

const checkOnTaskForm = (role: RoleDto, daysGone: number): boolean =>
  ['OWNER', 'MEMBER'].includes(role) && daysGone <= 0

const checkOnControls = (role: RoleDto, lastDay: boolean): boolean => !(role === 'OWNER' && !lastDay)

const checkOnCompleteStage = (reactions: boolean, role: RoleDto, goal: GoalDto): boolean =>
  role === 'OWNER' && reactions && goal.stage <= goal.day.stage

type GoalInfo = {
  runsForDays: number
  web: boolean
  form: boolean
  controls: boolean
  completeStage: boolean
  forTomorrow: boolean
}

export const getGoalInfo = (datesMap: Record<string, number>, goal: GoalDto, role: RoleDto): GoalInfo => {
  const { started, day } = goal
  const currentDate = new Date()
  const dates = Object.keys(datesMap)
  const lastDay = dates[dates.length - 1] === day.date
  const daysGone = differenceInCalendarDays(currentDate, Date.parse(day.date))
  const runsForDays = differenceInCalendarDays(currentDate, Date.parse(started))
  const web = checkOnWeb(day.date, currentDate, lastDay)
  const form = checkOnTaskForm(role, daysGone)
  const controls = checkOnControls(role, lastDay)
  const completeStage = checkOnCompleteStage(controls, role, goal)
  const forTomorrow = daysGone === -1

  return {
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
