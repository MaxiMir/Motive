import { SEARCH_ROUTE } from 'route'
import { setQueryParams } from 'helpers/url'

export const getHashtagHref = (q: string): string => {
  return setQueryParams(SEARCH_ROUTE, { q, type: 'tag' })
}
