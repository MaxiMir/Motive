import { SEARCH } from 'route'
import { setQueryParams } from 'src/common/helpers/url'

export const getHashtagHref = (q: string): string => setQueryParams(SEARCH, { q, type: 'tag' })
