import differenceInDays from 'date-fns/differenceInDays'
import { Goal } from 'dto'
import { getQueryParams, setQueryParams } from 'helpers/url'
import { parseJSON } from 'helpers/prepare'

const SCROLL_PARAM = 's'
const DATES_PARAM = 'd'
const SHOW_WEB_AFTER_DAYS = 14

export const getGoalHref = (userLink: string, goal: Goal): string =>
  setQueryParams(userLink, { [SCROLL_PARAM]: goal.id, [DATES_PARAM]: JSON.stringify({ [goal.id]: goal.day.id }) })

export const getQueryNewState = (goal: Goal): string => {
  const { [DATES_PARAM]: datesFromParams, ...restParams } = getQueryParams()
  const parsedDates = (datesFromParams && parseJSON(datesFromParams)) || {}

  return setQueryParams('', {
    ...restParams,
    [DATES_PARAM]: JSON.stringify({ ...parsedDates, [goal.id]: goal.day.id }),
  })
}

export const checkOnWeb = (datesMap: Record<string, string>, dayDate: string, currentDate: Date): boolean => {
  const dates = Object.keys(datesMap)
  const isLastDate = dates[dates.length - 1] === dayDate

  return isLastDate && differenceInDays(currentDate, Date.parse(dayDate)) >= SHOW_WEB_AFTER_DAYS
}
