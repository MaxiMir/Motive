import Axios from 'lib/axios'
import { TopicCreationDto, TopicDto } from 'dto'

export default class TopicService {
  /**
   * /topics
   */
  static create(data: TopicCreationDto): Promise<TopicDto> {
    return Axios.post('/topics', data)
  }
}
