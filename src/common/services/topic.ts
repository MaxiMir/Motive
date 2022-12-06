import { CreateMessageDto, TopicDto, UpdateMessageDto } from '@dto'
import fetcher from '@lib/fetcher'
import Service, { WhereParams } from './Service'

export default class TopicService extends Service {
  static get(where: WhereParams, page: number, take: number): Promise<TopicDto[]> {
    const whereParams = TopicService.getWhereParams(where)
    const paginationParams = TopicService.getPaginationParams(page, take)

    return fetcher.get('/topics', {
      params: { ...whereParams, ...paginationParams },
    })
  }

  static create(data: CreateMessageDto): Promise<TopicDto> {
    return fetcher.post('/topics', data)
  }

  static update(id: number, data: UpdateMessageDto): Promise<void> {
    return fetcher.put(`/topics/${id}`, data)
  }

  static updateLike(id: number, add: boolean): Promise<void> {
    const params = TopicService.getOperationParams(add)

    return fetcher.patch(`/topics/${id}/likes`, undefined, { params })
  }
}
