import differenceInDays from 'date-fns/differenceInDays'
import { GoalDto, RoleDto, UserBaseDto } from 'dto'
import { getQueryParams, setQueryParams } from 'helpers/url'

const SCROLL_PARAM = 's'
const DATES_PARAM = 'd'
const SHOW_WEB_AFTER_DAYS = 14

export const getGoalHref = (userLink: string, goal: GoalDto): string => {
  const { id, days } = goal

  return setQueryParams(userLink, { [SCROLL_PARAM]: goal.id, [DATES_PARAM]: `${id}:${days[0].id}` })
}

export const getQueryNewState = (goals: GoalDto[], goalId: number, dayId: number): string => {
  const { [DATES_PARAM]: _, ...restParams } = getQueryParams()
  const datesParam = goals.map(({ id, days }) => `${id}:${id !== goalId ? days[0].id : dayId}`).join(',')

  return setQueryParams('', {
    [DATES_PARAM]: datesParam,
    ...restParams,
  })
}

export const checkOnLastDay = (datesMap: Record<string, number>, dayDate: string): boolean => {
  const dates = Object.keys(datesMap)

  return dates[dates.length - 1] === dayDate
}

export const checkOnWeb = (dayDate: string, currentDate: Date, isLastDate: boolean): boolean => {
  return isLastDate && differenceInDays(currentDate, Date.parse(dayDate)) >= SHOW_WEB_AFTER_DAYS
}

export const getRole = (client: UserBaseDto, goal: GoalDto): RoleDto => {
  switch (true) {
    case goal.owner.id === client.id:
      return 'OWNER'
    default:
      return 'GUEST'
  }
}

export const checkOnTaskForm = (role: RoleDto, isLastDay: boolean): boolean =>
  !isLastDay && ['OWNER', 'MEMBER'].includes(role)
