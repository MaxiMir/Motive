import { SEARCH } from 'route'
import { setQueryParams } from 'helpers/url'

export const getHashtagHref = (q: string): string => {
  return setQueryParams(SEARCH, { q, type: 'tag' })
}
