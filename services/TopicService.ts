import Axios from 'lib/axios'
import { TopicCreationDto, TopicDto } from 'dto'
import { Service } from './Service'

export default class TopicService extends Service {
  /**
   * '/topics?where[day]={dayID}&skip={skip}&take={take}
   */
  static get(dayID: number, page: number, take: number): Promise<TopicDto[]> {
    const pagination = Service.getPaginationParams(page, take)

    return Axios.get('/topics', {
      params: { 'where[day]': dayID, ...pagination },
    })
  }

  /**
   * /topics
   */
  static create(data: TopicCreationDto): Promise<TopicDto> {
    return Axios.post('/topics', data)
  }

  /**
   * /topics/${id}/likes?operation=insert|delete
   */
  static updateLike(id: number, add: boolean): Promise<void> {
    const params = TopicService.getOperationParams(add)

    return Axios.patch(`/topics/${id}/likes`, undefined, { params })
  }
}
