import fetcher from '@shared/api/fetcher'
import { Filter, getFilterParams } from '@shared/lib/helpers/url'
import { TopicDto } from '@entities/topic/model/dto'

export const getTopics = (filter: Filter): Promise<TopicDto[]> => {
  const params = getFilterParams(filter)

  return fetcher.get('/topics', { params })
}
