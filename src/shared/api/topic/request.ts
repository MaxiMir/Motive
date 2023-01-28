import { fetcher } from '../fetcher'
import { Filter, getFilterParams } from '../filter'
import { CreateMessageDto, TopicDto, UpdateMessageDto } from './model'

export const getTopics = (filter: Filter): Promise<TopicDto[]> => {
  const params = getFilterParams(filter)

  return fetcher.get('/topics', { params })
}

export const createTopic = (data: CreateMessageDto): Promise<TopicDto> => {
  return fetcher.post('/topics', data)
}

export const updateTopic = (id: number, data: UpdateMessageDto): Promise<void> => {
  return fetcher.put(`/topics/${id}`, data)
}

export const updateLike = (id: number, insert: boolean): Promise<void> => {
  const params = getFilterParams({ insert })

  return fetcher.patch(`/topics/${id}/likes`, undefined, { params })
}
