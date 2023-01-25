import fetcher from '@shared/config/fetcher'
import { TopicDto } from '@shared/api/topic'
import { Filter, getFilterParams } from '@shared/lib/helpers/url'

export const getTopics = (filter: Filter): Promise<TopicDto[]> => {
  const params = getFilterParams(filter)

  return fetcher.get('/topics', { params })
}
