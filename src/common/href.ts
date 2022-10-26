import { setQueryParams } from '@helpers/url'

export const TOP_OF_THE_DAY = '/top-of-the-day'
export const SEARCH = '/search'
export const RATING = '/rating'
export const FOLLOWING = '/following'

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

export const getImageSrc = (src: string): string =>
  src.includes('https://') ? src : process.env.NEXT_PUBLIC_APP_URL + src

export const getUserHref = (nickname: string): string => `/${nickname}`

export const getGoalHref = (userHref: string, goalId: number): string => {
  const hashMark = getGoalHash(goalId)

  return userHref + hashMark
}

export const getGoalWithDayHref = (userHref: string, goalId: number, dayId: number): string => {
  const url = setQueryParams(userHref, { [SearchParam.Dates]: `${goalId}:${dayId}` })

  return getGoalHref(url, goalId)
}

export const getDiscussionHref = (userHref: string, goalId: number, dayId: number): string => {
  const url = setQueryParams(userHref, {
    [SearchParam.ScrollTo]: HashMark.Discussion,
    [SearchParam.ScrollId]: goalId,
    [SearchParam.Dates]: `${goalId}:${dayId}`,
  })
  const hash = getDiscussionHash(goalId)

  return url + hash
}

export const getFeedbackHref = (userHref: string, goalId: number, dayId: number): string => {
  const url = setQueryParams(userHref, { [SearchParam.Dates]: `${goalId}:${dayId}` })
  const hash = getDiscussionHash(goalId)

  return url + hash
}

const getGoalHash = (id: number): string => `#${HashMark.Goal}-${id}`

const getDiscussionHash = (id: number): string => `#${HashMark.Discussion}-${id}`
