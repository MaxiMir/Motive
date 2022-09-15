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

/**
 * Returns url information
 */
const getUrlData = (url: string) => {
  const [base, queryParams = ''] = url.split('?', 2)
  const searchParams = new URLSearchParams(queryParams)

  return { base, searchParams }
}

export const getSearchParams = (url: string): Record<string, string> => {
  const { searchParams } = getUrlData(url)

  return Object.fromEntries(searchParams)
}

const toUrl = (url: string, searchParams: URLSearchParams) =>
  [url, searchParams].join(!searchParams.toString() ? '' : '?')

/**
 * Returns the name of the method to insert
 */
const getInsertMethodName = (searchParams: URLSearchParams, name: string) =>
  !searchParams.has(name) ? 'append' : 'set'

/**
 * Returns query params
 */
export const getQueryParams = (): Record<string, string> =>
  Object.fromEntries(new URLSearchParams(window.location.search))

/**
 * Set Query params
 */
export const setQueryParams = (url: string, params: Record<string, string | number>): string => {
  const { base, searchParams } = getUrlData(url)

  Object.entries(params).forEach(([name, value]) => {
    const methodName = getInsertMethodName(searchParams, name)

    searchParams[methodName](name, value.toString())
  })

  return toUrl(base, searchParams)
}

export const getImageUrl = (src: string): string => (src.includes('https://') ? src : getUrlWithHost(src))

export const getUrlWithHost = (path: string): string => process.env.NEXT_PUBLIC_APP_URL + path

export const getUserHref = (nickname: string): string => `/${nickname}`

export const getGoalHref = (userHref: string, goalId: number): string => {
  const hashMark = getGoalHashMark(goalId)

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
  const hashMark = getDiscussionHashMark(goalId)

  return url + hashMark
}

export const getFeedbackHref = (userHref: string, goalId: number, dayId: number): string => {
  const url = setQueryParams(userHref, { [SearchParam.Dates]: `${goalId}:${dayId}` })
  const hashMark = getDiscussionHashMark(goalId)

  return url + hashMark
}

export const getGoalHashMark = (id: number): string => `#${HashMark.Goal}-${id}`

export const getDiscussionHashMark = (id: number): string => `#${HashMark.Discussion}-${id}`
