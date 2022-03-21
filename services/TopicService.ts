import Axios from 'lib/axios'
import { CreateMessageDto, TopicDto, UpdateMessageDto } from 'dto'
import { Service, WhereParams } from './Service'

export default class TopicService extends Service {
  static get(where: WhereParams, page: number, take: number): Promise<TopicDto[]> {
    const whereParams = TopicService.getWhereParams(where)
    const paginationParams = TopicService.getPaginationParams(page, take)

    return Axios.get('/topics', {
      params: { ...whereParams, ...paginationParams },
    })
  }

  static create(data: CreateMessageDto): Promise<TopicDto> {
    return Axios.post('/topics', data)
  }

  static update(id: number, data: UpdateMessageDto): Promise<void> {
    return Axios.put(`/topics/${id}`, data)
  }

  static updateLike(id: number, add: boolean): Promise<void> {
    const params = TopicService.getOperationParams(add)

    return Axios.patch(`/topics/${id}/likes`, undefined, { params })
  }
}
