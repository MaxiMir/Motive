import { fetcher } from '../fetcher'
import { Filter, getFilterParams } from '../filter'
import { CreateTopicDto, TopicDto, UpdateTopicDto } from './dto'

export function getTopics(filter: Filter): Promise<TopicDto[]> {
  const params = getFilterParams(filter)

  return fetcher.get('/topics', { params })
}

export function createTopic(dto: CreateTopicDto): Promise<TopicDto> {
  return fetcher.post('/topics', dto)
}

export function updateTopic(id: number, dto: UpdateTopicDto): Promise<void> {
  return fetcher.put(`/topics/${id}`, dto)
}

export function updateLike(id: number, insert: boolean): Promise<void> {
  const params = getFilterParams({ insert })

  return fetcher.patch(`/topics/${id}/likes`, undefined, { params })
}
