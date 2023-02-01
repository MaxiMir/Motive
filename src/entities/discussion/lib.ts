import { ParsedUrlQuery } from 'querystring'
import { HashMark, SearchParam } from 'shared/config'

export const checkOnOpenDiscussion = (query: ParsedUrlQuery, id: number) => {
  return (
    query[SearchParam.ScrollTo] === HashMark.Discussion &&
    query[SearchParam.ScrollId] === id.toString()
  )
}
