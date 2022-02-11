import Axios from 'lib/axios'

export default class DiscussionService {
  /**
   * /discussion/${messageId}
   */
  static setLike(data: { id: number; like: boolean }): Promise<void> {
    const { id, like } = data

    return Axios.put(`/discussion/${id}`, { like })
  }
}
