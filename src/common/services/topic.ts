import { service } from '@utils/service'
import { CreateMessageDto, TopicDto, UpdateMessageDto } from '@dto'
import { Service, WhereParams } from './Service'

export class TopicService extends Service {
  static get(where: WhereParams, page: number, take: number): Promise<TopicDto[]> {
    const whereParams = TopicService.getWhereParams(where)
    const paginationParams = TopicService.getPaginationParams(page, take)

    return service.get('/topics', {
      params: { ...whereParams, ...paginationParams },
    })
  }

  static create(data: CreateMessageDto): Promise<TopicDto> {
    return service.post('/topics', data)
  }

  static update(id: number, data: UpdateMessageDto): Promise<void> {
    return service.put(`/topics/${id}`, data)
  }

  static updateLike(id: number, add: boolean): Promise<void> {
    const params = TopicService.getOperationParams(add)

    return service.patch(`/topics/${id}/likes`, undefined, { params })
  }
}
