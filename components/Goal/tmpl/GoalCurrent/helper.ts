import differenceInDays from 'date-fns/differenceInDays'
import { GoalDto, RoleDto, UserBaseDto } from 'dto'
import { SEARCH_PARAMS, setQueryParams } from 'helpers/url'

const SHOW_WEB_AFTER_DAYS = 14

export const getGoalHref = (userHref: string, goal: GoalDto): string => {
  const { id, days } = goal

  return setQueryParams(userHref, { [SEARCH_PARAMS.SCROLL]: goal.id, [SEARCH_PARAMS.DATES]: `${id}:${days[0].id}` })
}

const checkOnWeb = (dayDate: string, currentDate: Date, lastDay: boolean): boolean =>
  lastDay && differenceInDays(currentDate, Date.parse(dayDate)) >= SHOW_WEB_AFTER_DAYS

export const getRole = (client: UserBaseDto, goal: GoalDto): RoleDto => {
  switch (true) {
    case goal.owner.id === client.id:
      return 'OWNER'
    default:
      return 'GUEST'
  }
}

const checkOnTaskForm = (role: RoleDto, todayGoal: boolean): boolean => ['OWNER', 'MEMBER'].includes(role) && todayGoal

export const getGoalInfo = (
  datesMap: Record<string, number>,
  goal: GoalDto,
  role: RoleDto,
): { runsForDays: number; lastDay: boolean; withWeb: boolean; withForm: boolean } => {
  const [day] = goal.days
  const currentDate = new Date()
  const dates = Object.keys(datesMap)
  const lastDay = dates[dates.length - 1] === day.date
  const daysGone = differenceInDays(currentDate, Date.parse(day.date))
  const runsForDays = differenceInDays(currentDate, Date.parse(goal.started))
  const withWeb = checkOnWeb(day.date, currentDate, lastDay)
  const withForm = checkOnTaskForm(role, !daysGone)

  return {
    runsForDays,
    lastDay,
    withWeb,
    withForm,
  }
}
