import Axios from 'lib/axios'
import { TopicCreationDto, TopicDto } from 'dto'

export default class TopicService {
  /**
   * '/topics?where[day]={dayId}&
   */
  static get(dayId: number, skip: number, take: number): Promise<TopicDto[]> {
    return Axios.get(`/topics?where[day]=${dayId}&skip=${skip}&take=${take}`)
  }

  /**
   * /topics
   */
  static create(data: TopicCreationDto): Promise<TopicDto> {
    return Axios.post('/topics', data)
  }
}
