import { TopicDto } from '@entities/topic/model/dto'
import fetcher from '@shared/api/fetcher'
import { Filter, getFilterParams } from '@shared/lib/helpers/url'

export const getTopics = (filter: Filter): Promise<TopicDto[]> => {
  const params = getFilterParams(filter)

  return fetcher.get('/topics', { params })
}
