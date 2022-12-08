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

export interface Params {
  where?: Record<string, string | number>
  pagination?: { page: number; take: number }
  insert?: boolean
}

const getWhere = (where: Params['where']) => {
  if (!where) {
    return null
  }

  return Object.fromEntries(Object.entries(where).map(([k, v]) => [`where[${k}]`, v]))
}

const getPagination = (pagination: Params['pagination']) => {
  if (!pagination) {
    return null
  }

  return { skip: pagination.page * pagination.take, take: pagination.take }
}

const getOperation = (insert: Params['insert']) => {
  if (!insert) {
    return null
  }

  return { operation: insert ? 'insert' : 'delete' }
}

export const getServerParams = ({ where, pagination, insert }: Params) => {
  const wherePrepared = getWhere(where)
  const paginationPrepared = getPagination(pagination)
  const insertPrepared = getOperation(insert)

  return { ...wherePrepared, ...paginationPrepared, ...insertPrepared }
}
