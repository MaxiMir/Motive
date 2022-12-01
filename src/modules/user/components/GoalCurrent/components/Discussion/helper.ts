import { GetNextPageParamFunction, QueryFunctionContext } from 'react-query'
import { TopicDto } from '@dto'
import TopicService from '@services/topic'

const TAKE = 20
export const PRELOAD_DIFF = 5

export const partialFetcher = (day: number): ((ctx: QueryFunctionContext) => Promise<TopicDto[]>) => {
  return ({ pageParam = 0 }: QueryFunctionContext) => TopicService.get({ day }, pageParam, TAKE)
}

export const partialGetNextPageParam = (count: number): GetNextPageParamFunction<TopicDto[]> | undefined => {
  return (_: TopicDto[], allPages: TopicDto[][]) => {
    const allCount = getTopicsCount(allPages.flat())

    return allCount < count ? allCount / TAKE : undefined
  }
}

const getTopicsCount = (topics: TopicDto[]): number => topics.reduce((acc, t) => acc + (!t.answer ? 1 : 2), 0)
