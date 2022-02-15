import Axios from 'lib/axios'
import { CreateTopicDto, TopicDto, TopicUpdateDto } from 'dto'
import { Service } from './Service'

export default class TopicService extends Service {
  static getByDayId(dayId: number, page: number, take: number): Promise<TopicDto[]> {
    const pagination = Service.getPaginationParams(page, take)

    return Axios.get('/topics', {
      params: { 'where[day]': dayId, ...pagination },
    })
  }

  static create(data: CreateTopicDto): Promise<TopicDto> {
    return Axios.post('/topics', data)
  }

  static update(data: TopicUpdateDto): Promise<TopicDto> {
    const { id, text } = data

    return Axios.put(`/topics/${id}`, { text })
  }

  static updateLike(id: number, add: boolean): Promise<void> {
    const params = TopicService.getOperationParams(add)

    return Axios.patch(`/topics/${id}/likes`, undefined, { params })
  }
}
