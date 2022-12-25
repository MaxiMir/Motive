import fetcher from '@lib/fetcher'
import { Filter, getFilterParams } from '@helpers/url'
import { CreateMessageDto, TopicDto, UpdateMessageDto } from './dto'

export class TopicService {
  static get(filter: Filter): Promise<TopicDto[]> {
    const params = getFilterParams(filter)

    return fetcher.get('/topics', { params })
  }

  static create(data: CreateMessageDto): Promise<TopicDto> {
    return fetcher.post('/topics', data)
  }

  static update(id: number, data: UpdateMessageDto): Promise<void> {
    return fetcher.put(`/topics/${id}`, data)
  }

  static updateLike(id: number, insert: boolean): Promise<void> {
    const params = getFilterParams({ insert })

    return fetcher.patch(`/topics/${id}/likes`, undefined, { params })
  }
}
