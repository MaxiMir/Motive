import { QueryFunctionContext } from 'react-query'
import { UserDto } from 'dto'
import FollowerService from 'services/FollowerService'

export const TAKE = 20
export const PRELOAD_DIFF = 5

export const partialFetcher = (userId: number): ((c: QueryFunctionContext) => Promise<UserDto[]>) => {
  return ({ pageParam = 0 }: QueryFunctionContext) => FollowerService.get(userId, pageParam, TAKE)
}
