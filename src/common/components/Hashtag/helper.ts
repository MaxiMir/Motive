import { Route } from '@href'
import { setQueryParams } from '@helpers/url'

export const getHashtagHref = (q: string): string => setQueryParams(Route.Search, { q, type: 'tag' })
