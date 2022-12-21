import fetcher from '@lib/fetcher'
import { FetchParams, getFetchParams } from '@helpers/url'
import { CreateMessageDto, TopicDto, UpdateMessageDto } from './dto'

export class TopicService {
  static get(fetchParams: FetchParams): Promise<TopicDto[]> {
    const params = getFetchParams(fetchParams)

    return fetcher.get('/topics', { params })
  }

  static create(data: CreateMessageDto): Promise<TopicDto> {
    return fetcher.post('/topics', data)
  }

  static update(id: number, data: UpdateMessageDto): Promise<void> {
    return fetcher.put(`/topics/${id}`, data)
  }

  static updateLike(id: number, insert: boolean): Promise<void> {
    const params = getFetchParams({ insert })

    return fetcher.patch(`/topics/${id}/likes`, undefined, { params })
  }
}
