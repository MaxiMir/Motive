export interface Filter {
  where?: Record<string, string | number>
  page?: number
  take?: number
  insert?: boolean
}

type SearchParamsEntries = Record<string, string | number>
type SetSearchParams = (url: string, params: SearchParamsEntries) => string
type ToUrl = (url: string, searchParams: URLSearchParams) => string
type GetFilterParams = (filter: Filter) => SearchParamsEntries

export const parseUrl = (url: string) => {
  const [base, params = ''] = url.split('?', 2)
  const searchParams = new URLSearchParams(params)

  return { base, searchParams }
}

export const getCurrentSearchParams = () => {
  return getSearchParams(window.location.search)
}

export const getSearchParams = (url: string) => {
  const { searchParams } = parseUrl(url)

  return Object.fromEntries(searchParams)
}

export const setSearchParams: SetSearchParams = (url, params) => {
  const { base, searchParams } = parseUrl(url)

  Object.entries(params).forEach(([name, value]) => {
    searchParams.set(name, value.toString())
  })

  return toUrl(base, searchParams)
}

const toUrl: ToUrl = (url, searchParams) => {
  return [url, searchParams].join(!searchParams.toString() ? '' : '?')
}

export const getFilterParams: GetFilterParams = (filter) => {
  const { where, page, take, insert } = filter
  const wherePrepared = getWhere()
  const paginationPrepared = getPagination()
  const insertPrepared = getOperation()

  function getWhere() {
    return !where
      ? null
      : Object.fromEntries(Object.entries(where).map(([k, v]) => [`where[${k}]`, v]))
  }

  function getPagination() {
    return typeof page !== 'number' || typeof take !== 'number' ? null : { skip: page * take, take }
  }

  function getOperation() {
    return typeof insert !== 'boolean' ? null : { operation: insert ? 'insert' : 'delete' }
  }

  return { ...wherePrepared, ...paginationPrepared, ...insertPrepared }
}
