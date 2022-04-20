import { ImageProps } from 'next/image'

export enum SEARCH_PARAMS {
  SCROLL = 's',
  DATES = 'd',
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

/**
 * Remove Query params
 */
export const removeQueryParams = (urn: string, params: string[]): string => {
  const { base, searchParams } = getUrnData(urn)

  params.forEach((name) => searchParams.delete(name))

  return toUrl(base, searchParams)
}

export const getImageUrl = (src: string | ImageProps['src']): ImageProps['src'] =>
  typeof src !== 'string' || src.includes('https://') ? src : getUrlWithHost(src)

export const getUrlWithHost = (urn: string): string => process.env.NEXT_PUBLIC_APP_URL + urn

export const getUserUrn = (nickname: string): string => `/${nickname}`

export const getGoalUrn = (userHref: string, goalId: number, dayId: number): string =>
  setQueryParams(userHref, { [SEARCH_PARAMS.SCROLL]: goalId, [SEARCH_PARAMS.DATES]: `${goalId}:${dayId}` })
