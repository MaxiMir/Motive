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

const checkOnControls = (role: RoleDto, lastDay: boolean): boolean => !(role === 'OWNER' && !lastDay)

const checkOnCompleteStage = (reactions: boolean, role: RoleDto): boolean => role === 'OWNER' && reactions

export const getGoalInfo = (
  datesMap: Record<string, number>,
  goal: GoalDto,
  role: RoleDto,
): {
  runsForDays: number
  web: boolean
  form: boolean
  reactions: boolean
  completeStage: boolean
  forTomorrow: boolean
} => {
  const [day] = goal.days
  const currentDate = new Date()
  const dates = Object.keys(datesMap)
  const lastDay = dates[dates.length - 1] === day.date
  const daysGone = differenceInCalendarDays(currentDate, Date.parse(day.date))
  const runsForDays = differenceInCalendarDays(currentDate, Date.parse(goal.started))
  const web = checkOnWeb(day.date, currentDate, lastDay)
  const form = checkOnTaskForm(role, daysGone)
  const reactions = checkOnControls(role, lastDay)
  const completeStage = checkOnCompleteStage(reactions, role)
  const forTomorrow = daysGone === -1

  return {
    runsForDays,
    web,
    form,
    reactions,
    completeStage,
    forTomorrow,
  }
}
