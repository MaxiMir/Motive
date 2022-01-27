import differenceInDays from 'date-fns/differenceInDays'
import { GoalDto, RoleDto, UserBaseDto } from 'dto'
import { SEARCH_PARAMS, setQueryParams } from 'helpers/url'
import { differenceInCalendarDays } from 'date-fns'

const SHOW_WEB_AFTER_DAYS = 14

export const getGoalHref = (userHref: string, goal: GoalDto): string => {
  const { id, days } = goal

  return setQueryParams(userHref, { [SEARCH_PARAMS.SCROLL]: goal.id, [SEARCH_PARAMS.DATES]: `${id}:${days[0].id}` })
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

const checkOnReactions = (role: RoleDto, lastDay: boolean): boolean => !(role === 'OWNER' && !lastDay)

export const getGoalInfo = (
  datesMap: Record<string, number>,
  goal: GoalDto,
  role: RoleDto,
): {
  runsForDays: number
  withWeb: boolean
  withForm: boolean
  withReactions: boolean
  forTomorrow: boolean
} => {
  const [day] = goal.days
  const currentDate = new Date()
  const dates = Object.keys(datesMap)
  const lastDay = dates[dates.length - 1] === day.date
  const daysGone = differenceInCalendarDays(currentDate, Date.parse(day.date))
  const runsForDays = differenceInCalendarDays(currentDate, Date.parse(goal.started)) + 1
  const withWeb = checkOnWeb(day.date, currentDate, lastDay)
  const withForm = checkOnTaskForm(role, daysGone)
  const withReactions = checkOnReactions(role, lastDay)
  const forTomorrow = daysGone === -1

  return {
    runsForDays,
    withWeb,
    withForm,
    withReactions,
    forTomorrow,
  }
}
