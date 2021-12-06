import Axios from 'lib/axios'
import { Topic } from 'dto'

export default class DiscussionService {
  /**
   * /discussion/${messageId}/
   */
  static setLike(data: { messageId: string; like: boolean }): Promise<Topic> {
    const { messageId, like } = data

    return Axios.put(`/discussion/${messageId}/`, { like })
  }
}
