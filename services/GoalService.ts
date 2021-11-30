import { Goal, GoalCreation } from 'dto'
import Axios from 'lib/axios'

export default class GoalService {
  /**
   * /goals/
   */
  static create(data: GoalCreation): Promise<Goal> {
    return Axios.post('/goals/', data)
  }

  /**
   * /goals/{id}/
   */
  static getById(data: { id: string }): Promise<Goal> {
    const { id } = data

    return Axios.get(`/goals/${id}`)
  }
}
