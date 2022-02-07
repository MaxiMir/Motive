import { useInfiniteQuery } from 'react-query'
import { TopicDto } from 'dto'
import TopicService from 'services/TopicService'
import { useMutateGoals } from 'views/UserView/hook'
import { LIMIT_TOPICS, PRELOAD_DIFF, changeGoals, getTopicsCount } from './helper'

export default function useDiscussion(
  goalId: number,
  dayId: number,
  count: number,
): {
  isLoading: boolean
  topics: TopicDto[]
  checkOnLoadMore: (index: number) => boolean
  onLoadMore: () => void
  onAdd: (topic: TopicDto) => void
} {
  const { isLoading, data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['discussion', dayId],
    ({ pageParam = 0 }) => TopicService.get(dayId, pageParam * LIMIT_TOPICS, LIMIT_TOPICS),
    {
      getNextPageParam: (_, allPages) => {
        const allCount = getTopicsCount(allPages.flat())

        return allCount < count ? allCount / LIMIT_TOPICS : undefined
      },
      enabled: !!count,
    },
  )
  const topics = data?.pages.flat() || []
  const [goals, mutateGoals] = useMutateGoals()

  const onLoadMore = () => fetchNextPage()

  const checkOnLoadMore = (index: number) => !!hasNextPage && topics.length - index === PRELOAD_DIFF

  const onAdd = async (topic: TopicDto) => {
    // await mutate(mergeTopics(data, topic), false)
    mutateGoals(changeGoals(goalId, goals))
  }

  return { isLoading, topics, checkOnLoadMore, onLoadMore, onAdd }
}
//
// const useMutateDiscussion = (dayId: number) => {
//   const key = ['discussion', dayId]
//   const queryClient = useQueryClient()
//   const state = queryClient.getQueryState<InfiniteData<TopicDto[]>>(key)
//
//   const mutate = (topic: TopicDto) =>
//     queryClient.setQueryData(
//       key,
//       produce(state, (draft) => {
//         // draft.data.pages[draft.data.pages.length - 1].push(topic)
//       }),
//     )
// }
