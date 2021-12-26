import Axios from 'lib/axios'
import { TopicDto } from 'dto'

export default class DiscussionService {
  /**
   * /discussion/${messageId}
   */
  static setLike(data: { messageId: number; like: boolean }): Promise<TopicDto> {
    const { messageId, like } = data

    return Axios.put(`/discussion/${messageId}`, { like })
  }
}
