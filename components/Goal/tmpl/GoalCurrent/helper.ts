import differenceInDays from 'date-fns/differenceInDays'
import { Goal, Role, UserBase } from 'dto'
import { getQueryParams, setQueryParams } from 'helpers/url'

const SCROLL_PARAM = 's'
const DATES_PARAM = 'd'
const SHOW_WEB_AFTER_DAYS = 14

export const getGoalHref = (userLink: string, goal: Goal): string => {
  const { id, days } = goal

  return setQueryParams(userLink, { [SCROLL_PARAM]: goal.id, [DATES_PARAM]: `${id}:${days[0].id}` })
}

export const getQueryNewState = (goals: Goal[], changedGoal: Goal): string => {
  const { [DATES_PARAM]: _, ...restParams } = getQueryParams()
  const datesParam = goals
    .map(({ id, days }) => `${id}:${id !== changedGoal.id ? days[0].id : changedGoal.days[0].id}`)
    .join(',')

  return setQueryParams('', {
    [DATES_PARAM]: datesParam,
    ...restParams,
  })
}

export const checkOnWeb = (datesMap: Record<string, number>, dayDate: string, currentDate: Date): boolean => {
  const dates = Object.keys(datesMap)
  const isLastDate = dates[dates.length - 1] === dayDate

  return isLastDate && differenceInDays(currentDate, Date.parse(dayDate)) >= SHOW_WEB_AFTER_DAYS
}

export const getRole = (goal: Goal, client: UserBase): Role => {
  switch (true) {
    case goal.owner.id === client.id:
      return 'OWNER'
    default:
      return 'GUEST'
  }
}
