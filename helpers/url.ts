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
const getUrnData = (urn: string) => {
  const [base, queryParams = ''] = urn.split('?', 2)
  const searchParams = new URLSearchParams(queryParams)

  return { base, searchParams }
}

export const getSearchParams = (urn: string): Record<string, string> => {
  const { searchParams } = getUrnData(urn)

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
export const setQueryParams = (urn: string, params: Record<string, string | number>): string => {
  const { base, searchParams } = getUrnData(urn)

  Object.entries(params).forEach(([name, value]) => {
    const methodName = getInsertMethodName(searchParams, name)

    searchParams[methodName](name, value.toString())
  })

  return toUrl(base, searchParams)
}

export const getImageUrl = (src: string): string => (src.includes('https://') ? src : getUrlWithHost(src))

export const getUrlWithHost = (urn: string): string => process.env.NEXT_PUBLIC_APP_URL + urn

export const getUserHref = (nickname: string): string => `/${nickname}`

export const getGoalUrn = (userUrn: string, goalId: number): string => {
  const hashMark = getGoalHashMark(goalId)

  return userUrn + hashMark
}

export const getGoalWithDayUrn = (userUrn: string, goalId: number, dayId: number): string => {
  const url = setQueryParams(userUrn, { [SearchParam.Dates]: `${goalId}:${dayId}` })

  return getGoalUrn(url, goalId)
}

export const getDiscussionUrn = (userUrn: string, goalId: number, dayId: number): string => {
  const url = setQueryParams(userUrn, {
    [SearchParam.ScrollTo]: HashMark.Discussion,
    [SearchParam.ScrollId]: goalId,
    [SearchParam.Dates]: `${goalId}:${dayId}`,
  })
  const hashMark = getDiscussionHashMark(goalId)

  return url + hashMark
}

export const getFeedbackUrn = (userUrn: string, goalId: number, dayId: number): string => {
  const url = setQueryParams(userUrn, { [SearchParam.Dates]: `${goalId}:${dayId}` })
  const hashMark = getDiscussionHashMark(goalId)

  return url + hashMark
}

export const getGoalHashMark = (id: number): string => `#${HashMark.Goal}-${id}`

export const getDiscussionHashMark = (id: number): string => `#${HashMark.Discussion}-${id}`
