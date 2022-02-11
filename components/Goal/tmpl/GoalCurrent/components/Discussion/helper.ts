import produce from 'immer'
import { GetNextPageParamFunction, InfiniteData, QueryFunctionContext } from 'react-query'
import { GoalDto, TopicDto } from 'dto'
import TopicService from 'services/TopicService'

const TAKE = 20
export const PRELOAD_DIFF = 5

export const partialFetcher = (dayId: number): ((ctx: QueryFunctionContext) => Promise<TopicDto[]>) => {
  return ({ pageParam = 0 }: QueryFunctionContext) => TopicService.get(dayId, pageParam, TAKE)
}

export const partialGetNextPageParam = (count: number): GetNextPageParamFunction<TopicDto[]> | undefined => {
  return (_: TopicDto[], allPages: TopicDto[][]) => {
    const allCount = getTopicsCount(allPages.flat())

    return allCount < count ? allCount / TAKE : undefined
  }
}

const getTopicsCount = (topics: TopicDto[]): number => topics.reduce((acc, t) => acc + (!t.answer ? 1 : 2), 0)

export const addTopic = (data: InfiniteData<TopicDto[]>, topic: TopicDto): InfiniteData<TopicDto[]> => {
  return produce(data, (draft) => {
    if (!topic.answer) {
      draft.pages = [[topic], ...draft.pages]
      return
    }

    const draftTopic = draft.pages.flat().find((t) => t.id === topic.id)

    if (draftTopic) {
      draftTopic.answer = topic.answer
    }
  })
}

export const changeGoals = (goalId: number, goals: GoalDto[]): GoalDto[] => {
  return produce(goals, (draft: GoalDto[]) => {
    const draftGoal = draft[draft.findIndex((g) => g.id === goalId)]

    draftGoal.day.topicCount += 1
  })
}
