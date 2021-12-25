import { Calendar, Goal, GoalCreation } from 'dto'
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
  static getById(data: { dayId: number }): Promise<Goal> {
    const { dayId } = data

    return Axios.get(`/goals/${dayId}`)
  }

  /**
   * /goals/{id}/calendar
   */
  static getDates(data: { dayId: number }): Promise<Calendar[]> {
    const { dayId } = data

    return Axios.get(`/goals/${dayId}/calendar`)
  }
}
