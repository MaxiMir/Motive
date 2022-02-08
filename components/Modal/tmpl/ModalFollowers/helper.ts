import { GetNextPageParamFunction, QueryFunctionContext } from 'react-query'
import { UserDto } from 'dto'
import SubscriptionService from 'services/SubscriptionService'

const TAKE = 20
export const PRELOAD_DIFF = 5

export const partialFetcher = (id: number): ((c: QueryFunctionContext) => Promise<UserDto[]>) => {
  return ({ pageParam = 0 }: QueryFunctionContext) => SubscriptionService.getFollowers(id, pageParam, TAKE)
}

export const partialGetNextPageParam = (count: number): GetNextPageParamFunction<UserDto[]> | undefined => {
  return (_: UserDto[], allPages: UserDto[][]) => {
    const allCount = allPages.flat().length

    return allCount < count ? allCount / TAKE : undefined
  }
}
