import Axios from 'lib/axios'
import { CreateMessageDto, TopicDto, UpdateMessageDto } from 'dto'
import { Service } from './Service'

export default class TopicService extends Service {
  static getByDayId(dayId: number, page: number, take: number): Promise<TopicDto[]> {
    const pagination = Service.getPaginationParams(page, take)

    return Axios.get('/topics', {
      params: { 'where[day]': dayId, ...pagination },
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
