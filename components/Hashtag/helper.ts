import { SEARCH } from 'route'
import { setQueryParams } from 'helpers/url'

export const getHashtagHref = (q: string): string => setQueryParams(SEARCH, { q, type: 'tag' })
