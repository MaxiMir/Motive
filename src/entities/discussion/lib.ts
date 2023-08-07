import { ParsedUrlQuery } from 'querystring'
import { HashMark, SearchParam } from 'shared/config'

export function checkOnOpenDiscussion(query: ParsedUrlQuery, id: number) {
  return Boolean(
    query[SearchParam.ScrollTo] === HashMark.Discussion &&
      query[SearchParam.ScrollId] === id.toString(),
  )
}
