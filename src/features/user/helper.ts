import { setSearchParams } from '@helpers/url'
import { Route } from '@href'

type GetGoalHref = (userHref: string, goalId: number) => string
type GetDayHref = (userHref: string, goalId: number, dayId: number) => string

export const enum SearchParam {
  Dates = 'd',
  ScrollTo = 's',
  ScrollId = 'i',
}

export const enum HashMark {
  Goal = 'goal',
  Feedback = 'feedback',
  Discussion = 'discussion',
}

export const getUserHref = (nickname: string): string => `/${nickname}`

export const getGoalHref: GetGoalHref = (userHref, goalId) => {
  const hashMark = `#${HashMark.Goal}-${goalId}`

  return userHref + hashMark
}

export const getDayHref: GetDayHref = (userHref, goalId, dayId) => {
  const url = setSearchParams(userHref, { [SearchParam.Dates]: `${goalId}:${dayId}` })

  return getGoalHref(url, goalId)
}

export const getDiscussionHref: GetDayHref = (userHref, goalId, dayId) => {
  const url = setSearchParams(userHref, {
    [SearchParam.ScrollTo]: HashMark.Discussion,
    [SearchParam.ScrollId]: goalId,
    [SearchParam.Dates]: `${goalId}:${dayId}`,
  })
  const hash = `#${HashMark.Discussion}-${goalId}`

  return url + hash
}

export const getFeedbackHref: GetDayHref = (userHref, goalId, dayId) => {
  const url = setSearchParams(userHref, { [SearchParam.Dates]: `${goalId}:${dayId}` })
  const hash = `#${HashMark.Feedback}-${goalId}`

  return url + hash
}

export const getHashtagHref = (q: string): string => {
  return setSearchParams(Route.Search, { q, type: 'tag' })
}
