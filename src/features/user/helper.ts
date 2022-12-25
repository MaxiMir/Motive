import { setSearchParams } from '@helpers/url'
import { Route } from '@href'

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

export const getGoalHref = (userHref: string, goalId: number): string => {
  const hashMark = `#${HashMark.Goal}-${goalId}`

  return userHref + hashMark
}

export const getDayHref = (userHref: string, goalId: number, dayId: number): string => {
  const url = setSearchParams(userHref, { [SearchParam.Dates]: `${goalId}:${dayId}` })

  return getGoalHref(url, goalId)
}

export const getDiscussionHref = (userHref: string, goalId: number, dayId: number): string => {
  const url = setSearchParams(userHref, {
    [SearchParam.ScrollTo]: HashMark.Discussion,
    [SearchParam.ScrollId]: goalId,
    [SearchParam.Dates]: `${goalId}:${dayId}`,
  })
  const hash = `#${HashMark.Discussion}-${goalId}`

  return url + hash
}

export const getFeedbackHref = (userHref: string, goalId: number, dayId: number): string => {
  const url = setSearchParams(userHref, { [SearchParam.Dates]: `${goalId}:${dayId}` })
  const hash = `#${HashMark.Feedback}-${goalId}`

  return url + hash
}

export const getHashtagHref = (q: string): string => {
  return setSearchParams(Route.Search, { q, type: 'tag' })
}
