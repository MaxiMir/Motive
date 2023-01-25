export interface Filter {
  where?: Record<string, string | number>
  page?: number
  take?: number
  insert?: boolean
}

type SearchParamsEntries = Record<string, string | number>

export const parseUrl = (url: string) => {
  const [origin, params = ''] = url.split('?', 2)
  const searchParams = new URLSearchParams(params)

  return { origin, searchParams }
}

export const getCurrentSearchParams = (): Record<string, string> => {
  return getSearchParams(window.location.search)
}

export const getSearchParams = (url: string): Record<string, string> => {
  const { searchParams } = parseUrl(url)

  return Object.fromEntries(searchParams)
}

export const setSearchParams = (url: string, params: SearchParamsEntries): string => {
  const { origin, searchParams } = parseUrl(url)

  Object.entries(params).forEach(([name, value]) => {
    searchParams.set(name, value.toString())
  })

  return toUrl(origin, searchParams)
}

const toUrl = (url: string, searchParams: URLSearchParams): string => {
  return [url, searchParams].join(!searchParams.toString() ? '' : '?')
}

export const getFilterParams = (filter: Filter): SearchParamsEntries => {
  const { where, page, take, insert } = filter
  const wherePrepared = !where
    ? null
    : Object.fromEntries(Object.entries(where).map(([k, v]) => [`where[${k}]`, v]))
  const paginationPrepared =
    typeof page !== 'number' || typeof take !== 'number' ? null : { skip: page * take, take }
  const insertPrepared =
    typeof insert !== 'boolean' ? null : { operation: insert ? 'insert' : 'delete' }

  return { ...wherePrepared, ...paginationPrepared, ...insertPrepared }
}

export const getImageSrc = (src: string): string => {
  return src.includes('https://') ? src : process.env.NEXT_PUBLIC_APP_URL + src
}
