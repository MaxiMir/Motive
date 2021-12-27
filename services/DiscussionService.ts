import Axios from 'lib/axios'
import { TopicDto } from 'dto'

export default class DiscussionService {
  /**
   * /discussion/${messageId}
   */
  static setLike(data: { id: number; like: boolean }): Promise<TopicDto> {
    const { id, like } = data

    return Axios.put(`/discussion/${id}`, { like })
  }
}
