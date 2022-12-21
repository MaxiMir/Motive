/**
 * Returns url information
 */
export const parseUrl = (url: string) => {
  const [base, params = ''] = url.split('?', 2)
  const searchParams = new URLSearchParams(params)

  return { base, searchParams }
}

/**
 * Returns search params
 */
export const getCurrentSearchParams = (): Record<string, string> => {
  return getSearchParams(window.location.search)
}

export const getSearchParams = (url: string): Record<string, string> => {
  const { searchParams } = parseUrl(url)

  return Object.fromEntries(searchParams)
}

/**
 * Returns the name of the method to insert
 */
const getMethodName = (searchParams: URLSearchParams, name: string) => {
  return !searchParams.has(name) ? 'append' : 'set'
}

/**
 * Set Search params
 */
export const setSearchParams = (url: string, params: Record<string, string | number>): string => {
  const { base, searchParams } = parseUrl(url)

  Object.entries(params).forEach(([name, value]) => {
    const methodName = getMethodName(searchParams, name)
    searchParams[methodName](name, value.toString())
  })

  return toUrl(base, searchParams)
}

const toUrl = (url: string, searchParams: URLSearchParams) =>
  [url, searchParams].join(!searchParams.toString() ? '' : '?')

export interface FetchParams {
  where?: Record<string, string | number>
  page?: number
  take?: number
  insert?: boolean
}

const getWhere = (where: FetchParams['where']) =>
  !where ? null : Object.fromEntries(Object.entries(where).map(([k, v]) => [`where[${k}]`, v]))

const getPagination = (page?: number, take?: number) =>
  typeof page !== 'number' || typeof take !== 'number' ? null : { skip: page * take, take }

const getOperation = (insert: FetchParams['insert']) => {
  return !insert ? null : { operation: insert ? 'insert' : 'delete' }
}

export const getFetchParams = (fetchParams: FetchParams) => {
  const { where, page, take, insert } = fetchParams
  const wherePrepared = getWhere(where)
  const paginationPrepared = getPagination(page, take)
  const insertPrepared = getOperation(insert)

  return { ...wherePrepared, ...paginationPrepared, ...insertPrepared }
}
