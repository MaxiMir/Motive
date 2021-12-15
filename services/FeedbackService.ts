import Axios from 'lib/axios'
import { Feedback } from 'dto'

export default class FeedbackService {
  /**
   * /feedback/{id}/
   */
  static getById(data: { id: number }): Promise<Feedback> {
    const { id } = data

    return Axios.get(`/feedback/${id}/`)
  }
}
