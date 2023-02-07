import { fetcher } from '../fetcher'
import { Filter, getFilterParams } from '../filter'
import { CreateTopicDto, TopicDto, UpdateTopicDto } from './dto'

export const getTopics = (filter: Filter): Promise<TopicDto[]> => {
  const params = getFilterParams(filter)

  return fetcher.get('/topics', { params })
}

export const createTopic = (data: CreateTopicDto): Promise<TopicDto> => {
  return fetcher.post('/topics', data)
}

export const updateTopic = (id: number, data: UpdateTopicDto): Promise<void> => {
  return fetcher.put(`/topics/${id}`, data)
}

export const updateLike = (id: number, insert: boolean): Promise<void> => {
  const params = getFilterParams({ insert })

  return fetcher.patch(`/topics/${id}/likes`, undefined, { params })
}
