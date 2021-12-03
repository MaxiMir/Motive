/**
 * Returns url information
 */
const getUrnData = (urn: string) => {
  const [urlWithoutSearchParams, queryParams = ''] = urn.split('?', 2)
  const searchParams = new URLSearchParams(queryParams)

  return { urlWithoutSearchParams, searchParams }
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
  const { urlWithoutSearchParams, searchParams } = getUrnData(urn)

  Object.entries(params).forEach(([name, value]) => {
    const methodName = getInsertMethodName(searchParams, name)

    searchParams[methodName](name, value.toString())
  })

  return toUrl(urlWithoutSearchParams, searchParams)
}

/**
 * Remove Query params
 */
export const removeQueryParams = (urn: string, params: string[]): string => {
  const { urlWithoutSearchParams, searchParams } = getUrnData(urn)

  params.forEach((name) => searchParams.delete(name))

  return toUrl(urlWithoutSearchParams, searchParams)
}
